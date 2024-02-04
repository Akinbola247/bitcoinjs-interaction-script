function decodeTransaction(rawTx) {
    // Convert the raw transaction to bytes if it's not already
    if (typeof rawTx === 'string') {
        rawTx = Buffer.from(rawTx, 'hex');
    }

    // Version
    const version = rawTx.slice(0, 4).reverse().toString('hex');
    console.log("version: ", version);

    // Marker and flag (only present in SegWit transactions)
    const marker = rawTx[4];
    const flag = rawTx[5];
    console.log("marker: ", marker);
    console.log("flag: ", flag);

    // Number of inputs
    const numInputs = rawTx[6];
    console.log("num_inputs: ", numInputs);

    // Inputs
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
        const offset = 7 + i * 41;
        const input = rawTx.slice(offset, offset + 41).toString('hex');
        inputs.push(input);
    }
    console.log("inputs: ", inputs);

    // Number of outputs
    const numOutputsOffset = 7 + numInputs * 41;
    const numOutputs = rawTx[numOutputsOffset];
    console.log("num_outputs: ", numOutputs);

    // Outputs
    const outputs = [];
    for (let i = 0; i < numOutputs; i++) {
        const offset = numOutputsOffset + 1 + i * 33;
        const output = rawTx.slice(offset, offset + 33).toString('hex');
        outputs.push(output);
    }
    console.log("outputs: ", outputs);

    // Witness data (only present in SegWit transactions)
    const witnessOffset = numOutputsOffset + 1 + numOutputs * 33;
    const witness = rawTx.slice(witnessOffset, witnessOffset + rawTx.length - 4).toString('hex');
    console.log("witness: ", witness);

    // Locktime
    const locktime = rawTx.slice(-4).reverse().toString('hex');
    console.log("locktime: ", locktime);

    return {
        version,
        numInputs,
        inputs,
        numOutputs,
        outputs,
        locktime
    };
}

function testDecodeTransaction() {
    const rawTx = '020000000001010ccc140e766b5dbc884ea2d780c5e91e4eb77597ae64288a42575228b79e234900000000000000000002bd37060000000000225120245091249f4f29d30820e5f36e1e5d477dc3386144220bd6f35839e94de4b9cae81c00000000000016001416d31d7632aa17b3b316b813c0a3177f5b6150200140838a1f0f1ee607b54abf0a3f55792f6f8d09c3eb7a9fa46cd4976f2137ca2e3f4a901e314e1b827c3332d7e1865ffe1d7ff5f5d7576a9000f354487a09de44cd00000000';
    // Call your decodeTransaction function
    const decoded = decodeTransaction(rawTx);
    console.log(decoded.version);

    // Assert that the outputs are as expected
    console.assert(decoded.version === '00000002', `Expected version to be 00000002, but got ${decoded.version}`);
    console.assert(decoded.numInputs === 1, `Expected num_inputs to be 1, but got ${decoded.numInputs}`);
    console.assert(decoded.inputs.length === decoded.numInputs, `Expected ${decoded.numInputs} inputs, but got ${decoded.inputs.length}`);
    console.assert(decoded.numOutputs === 2, `Expected num_outputs to be 2, but got ${decoded.numOutputs}`);
    console.assert(decoded.outputs.length === decoded.numOutputs, `Expected ${decoded.numOutputs} outputs, but got ${decoded.outputs.length}`);
    console.assert(decoded.locktime === '00000000', `Expected locktime to be 00000000, but got ${decoded.locktime}`);
}

// Call the test function
testDecodeTransaction();
