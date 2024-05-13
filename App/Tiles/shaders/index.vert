uniform float uBendFactor;
uniform float uHoldingSpeed;

varying vec2 vUv;

void main(){
  vec3 newPosition = position;
  float d = distance(uv, vec2(0.5));
  d = 1.0 - smoothstep(0.0, 1.0, d);

  // BEND FACTOR ON X
  float bendFactor = uBendFactor * 0.02;
  bendFactor = clamp(bendFactor, -0.35, 0.35);
  newPosition.x += d * bendFactor;

  // BEND FACTOR ON Z // HOLDING INTERACTION
  newPosition.z -= d * uHoldingSpeed * 500.0; 

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vUv = uv;
}