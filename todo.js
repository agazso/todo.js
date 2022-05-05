/*
 * Parse todo items out of markdown with keeping dates and parent topics
 */

const fs = require('fs');

const state = {
    previousLine: '',
    date: '',
}

try {
    const data = fs.readFileSync(process.argv[2], 'UTF-8');

    const lines = data.split(/\r?\n/);
    const isDate = s => s.match(/\d{4}\-\d{2}\-\d{2}/)
    const isHeaderSeparator = s => s.match(/==========/)

    lines.forEach((line) => {
        if (isDate(state.previousLine) && isHeaderSeparator(line)) {
            state.date = state.previousLine
        }
        if (line.match(/\- \[\ \]/)) {
            console.log(`${state.date}: ${line}`)
        }
        state.previousLine = line
    });
} catch (err) {
    console.error(err);
}
