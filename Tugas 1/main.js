// Get the canvas element
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

// Initialize WebGL context
if (!gl) {
    console.error('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
    alert('Your browser does not support WebGL');
}

// Define vertices for the rectangles (two triangles per rectangle)
const vertices = new Float32Array([
    // First rectangle (top-left)
    -0.7,  0.3, 
    -0.3,  0.3, 
    -0.7,  0.1, 
    -0.3,  0.1, 
    -0.7,  0.1, 
    -0.3,  0.3, 

    // Second rectangle (top-right)
    -0.2,  0.3, 
    0.2,   0.3, 
    -0.2,  0.1, 
    0.2,   0.1, 
    -0.2,  0.1, 
    0.2,   0.3, 

    // Third rectangle (bottom-left)
    -0.5, -0.1, 
    -0.1, -0.1, 
    -0.5, -0.3, 
    -0.1, -0.3, 
    -0.5, -0.3, 
    -0.1, -0.1, 

    // Fourth rectangle (bottom-right)
    0.1, -0.1, 
    0.5, -0.1, 
    0.1, -0.3, 
    0.5, -0.3, 
    0.1, -0.3, 
    0.5, -0.1
]);

// Create a buffer and put the vertices in it
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Create and compile the vertex shader
const vertexShaderCode = `
    attribute vec2 coordinates;
    void main(void) {
        gl_Position = vec4(coordinates, 0.0, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

// Create and compile the fragment shader
const fragmentShaderCode = `
    void main(void) {
        gl_FragColor = vec4(0.8, 0.4, 0.3, 1.0);
    }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

// Link the vertex and fragment shaders into a program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Bind the vertex buffer to the shader program
const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

// Clear the canvas and draw the rectangles
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
