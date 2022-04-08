export async function readTextFile(file) {
    return new Promise(resolve => {
        let rawFile = new XMLHttpRequest();
        if (import.meta.env.MODE === 'development') {
            file = '../../public/' + file
        }
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    resolve(allText)
                }
            }
        }
        rawFile.send(null);
    })
}
