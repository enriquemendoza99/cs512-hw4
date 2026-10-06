function Cube(color) {
    const vertices = [
        // Front
        -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,
        // Back
         1, -1, -1,  -1, -1, -1,  -1,  1, -1,   1,  1, -1,
        // Left
        -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1,
        // Right
         1, -1,  1,   1, -1, -1,   1,  1, -1,   1,  1,  1,
        // Top
        -1,  1,  1,   1,  1,  1,   1,  1, -1,  -1,  1, -1,
        // Bottom
        -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1
    ];

    const normals = [], colors = [], indices = [];
    for (let f = 0; f < 6; f++) {
        const k = 4 * f;
        const p0 = [vertices[3 * k], vertices[3 * k + 1], vertices[3 * k + 2]];
        const p1 = [vertices[3 * k + 3], vertices[3 * k + 4], vertices[3 * k + 5]];
        const p2 = [vertices[3 * k + 6], vertices[3 * k + 7], vertices[3 * k + 8]];
        const e1 = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
        const e2 = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]];
        // n = (p1 - p0) x (p2 - p0)
        const n = normalize(cross(e1, e2));
        for (let j = 0; j < 4; j++) {
            normals.push(n[0], n[1], n[2]);
            colors.push(color[0], color[1], color[2]);
        }
        indices.push(k, k + 1, k + 2,  k, k + 2, k + 3);
    }

    return { vertices, normals, colors, indices };
}

function Sphere(r, uSteps, vSteps, color) {
  const vertices = [], normals = [], colors = [], indices = [];
  for (let i = 0; i <= vSteps; i++) {
    const v = i * Math.PI / vSteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);
      const x = cosu * sinv;
      const y = cosv;
      const z = sinu * sinv;
      vertices.push(r * x, r * y, r * z);
      normals.push(x, y, z);
      colors.push(color[0], color[1], color[2]);
    }
  }
  for (let i = 0; i < vSteps; i++) {
    for (let j = 0; j < uSteps; j++) {
      const k1 = (i * (uSteps + 1)) + j;
      const k2 = k1 + uSteps + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }
  return { vertices, normals, colors, indices };
}

function Cylinder(r, h, uSteps, color) {
  const vertices = [], normals = [], colors = [], indices = [];
  for (let i = 0; i <= 1; i++) {
    const v = i;
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      const x = r * Math.cos(u);
      const y = r * Math.sin(u);
      const z = h * v;
      vertices.push(x, y, z);
      normals.push(Math.cos(u), Math.sin(u), 0);
      colors.push(color[0], color[1], color[2]);
    }
  }
  for (let j = 0; j < uSteps; j++) {
    const k1 = j;
    const k2 = k1 + uSteps + 1;
    indices.push(k1, k2, k1 + 1);
    indices.push(k2, k2 + 1, k1 + 1);
  }
  for (let i = 0; i <= 1; i++) {
    const center = vertices.length / 3;
    vertices.push(0, 0, h * i);
    normals.push(0, 0, 2 * i - 1);
    colors.push(color[0], color[1], color[2]);
    for (let j = 0; j <= uSteps; j++) {
      const u = j * 2 * Math.PI / uSteps;
      vertices.push(r * Math.cos(u), r * Math.sin(u), h * i);
      normals.push(0, 0, 2 * i - 1);
      colors.push(color[0], color[1], color[2]);
    }
    for (let j = 0; j < uSteps; j++) {
      indices.push(center, center + 1 + j, center + 2 + j);
    }
  }
  return { vertices, normals, colors, indices };
}
