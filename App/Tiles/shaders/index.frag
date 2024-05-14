uniform float uBendFactor;
uniform sampler2D uMap;

varying vec2 vUv;

vec2 scaleFromCenter(vec2 uv, float scale){
  uv -= vec2(0.5);
  uv *= scale;
  uv += vec2(0.5);

  return uv;
}

void main(){
  // NORMAL UV
  vec2 newUv = vUv * 0.8;

  // SCALED UV
  vec2 scaledUv = scaleFromCenter(vUv, 1.0);

  vec4 map = texture2D(uMap, scaledUv);
  //map.rgb += uBendFactor * 0.004;
  //map.rgb = map.grb;

  // GRADIENT DISTANCE // DEBUG
  float d = distance(vUv, vec2(0.5));

  // B&W
  vec3 blackAndWhiteColor = vec3(map.rrr);
  float colorInterpolator = smoothstep(0.0, 30.0, abs(uBendFactor));
  vec3 finalColor = mix(map.rgb, blackAndWhiteColor, colorInterpolator);


  // CHROMATIC DISPLACEMENT
  vec2 chromUv = vUv;
  float uvShift = 0.08;
  float red = texture2D(uMap, chromUv + vec2(uvShift, 0.0)).r;
  float green = texture2D(uMap, chromUv + vec2(0, 0.0)).g;
  float blue = texture2D(uMap, chromUv + vec2(-uvShift, 0.0)).b;

  finalColor = vec3(red, green, blue);
  finalColor = mix(map.rgb, finalColor, d);


  gl_FragColor = map;
  gl_FragColor = vec4(map.rgb, 1.0);

  // COLORSPACE CHUNKS
  #include <tonemapping_fragment>
	#include <colorspace_fragment>
}