#define PARTICLES sTD2DInputs

// Simulation parameters
uniform float timeStep;

out vec4 fragColor;
void main()
{
    // Read current particle position
    vec3 pos = texture(PARTICLES[0], vUV.st).xyz;

    // Compute spatial differentials
    float dt = timeStep * 6;
    float dx = pos.y + 2.07 * pos.x * pos.y + pos.x * pos.z;
    float dy = 1 - 1.79 * pow(pos.x, 2) + pos.y * pos.z;
    float dz = pos.x - pow(pos.x, 2) - pow(pos.y, 2);

    // Update the particle position
    vec3 d_pos = dt * vec3(dx, dy, dz);
    pos += d_pos;

    fragColor = TDOutputSwizzle(vec4(pos, 1.0));
}