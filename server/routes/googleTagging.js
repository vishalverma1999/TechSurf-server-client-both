const router = require("express").Router();
// const CREDENTIALS = JSON.parse(JSON.stringify({
//     "type": "service_account",
//     "project_id": "ringed-hallway-392006",
//     "private_key_id": "20ac204483024abec4d4759ef5ce767182984fe8",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhGCjUR0U5y5y3\n+QqXRTWQCdvMuCcjqGPl8RPEYpp/+Q2DZmEnzH9qErM3tJuTGHYRs3jrYBy2rubp\nTiuTOX8ds2tzc5Qsv6860Q0bDsPHsQ7TXHuwC/zmba1MZNySY4ZA9RndAc39CEvT\nVtZhgdVVbWox/ujF6TqXmVvC/a9LKC6b3Qb6lydrxvT82x7zl71gF34H4DrUiCYb\nDb/niz1+OGbeJMLdrPrLtAj1HazSDxQ81IMAXtQJ2wDM4wPEFpJdp0crnDGgxAl9\n1e8zGVUbd8ZfxKe/1KoHiGxQci9gvys6oaSuNbP5mZ9aNIhWr81Z7AveW5Tw0tL0\nzAevgg2rAgMBAAECggEAL8Ihf5CzlmSmFr6nSZsslygQU6pK25zxvSreR8+n+jkM\nbfG98WTJL+dR0SLn01jgTDcpE7+rt/L6GUw1oKIVX2bfCHrgWHI/KpqKTlBep7Lg\nc2Xu9FZGzVk96LSJvCGTrZqTZznny6UD+Y42JDAY5Gw3mO3902f9v4aRWpjapXY2\nHmX5NCnnor1HVsHDdW3so2ncul8R7WiuCMUBCFeZPC+uYuV6lLJqaJTtR/1uz3ea\nm4XdvEF8/QP8Dsi131IZHNttSrl2YcPxolSmgga4Qk5NXfNO5pTfgK+v2j5v9U7C\nio8RxwOEVLZ4uL5soYB42vhplDa905oL93kgkfQUQQKBgQD68On7OxYfCbeSKLuN\ne1b4umyAb0tD67pHJueuXKP9EkounXr7MP/YyngkwFoWO1jbo8X/QwvYeQCrxYd2\nJ6edkJf5xtGipYRieRz8S9t3rq5j4e2yK87/cIZMjagMbLfJHP0/7xLtwIJL8jdN\n6QhIM5NT8q5lpMqBZAAC0CoPywKBgQDlodpT5Zf54ctzB4FqtjdXNUMBM0DgqReY\n7gRq4hDsNxyoxI89z/g1oW/sJIM/KI2khMvYTCGjPZ5sLNiRWQ0PEuZas6q+M1cC\nF0G5d9D18oxN4qmPttKJ2G+tBuwLk4/wEwt38ohueUF/IKUuf+W90/jvqBEUhYgB\nHrRXlwh9oQKBgGw89e+zcLs6ib+1ahCAnubyIlLTrndBejuugEgpFWLXPMAWlTE7\n1V9BFclkXncwagdzALg1xyo8JxnwPZmtSRMhhyvpogqxsgR3kRUR8zwQUJAsp0Yu\ntz5e3s6uW0ngqvVIV8P37wY1/v2bIFeuqC/cbzPKfYbCKcbdx1NvTnU5AoGBALYq\nXd7sZlHPM+x+6cXT47cFA7CyDierPJMPTuXTjQU2+z9PHys0Dn3NIdK9bHjwHN2E\nk4l1a8HqIgFC2lMDx/5LSf5uRWc5py57cKJHULerwG4Q/96IdCDyWDV1JlBQsYEM\nOq7e8ihhfPny1dc7ku+ydur38wTKoYfx6bMKl6vBAoGACRAf/Cb6RzA/GOdo3rCR\nEqsPL3kDEAkKvniMCWrvZsPXFE+h7DzKkA0asB7nA4F6yCLZSmJAsyJkvLbaZeWX\nPkJTfslaSS4cWEAUwG2fAifj2FLBNLVudTiKdsuPmgRyHI3J2X2hUtXKErOtYhMs\nLBmEqbdL0Q+liWn4xfz8lOg=\n-----END PRIVATE KEY-----\n",
//     "client_email": "kaushal@ringed-hallway-392006.iam.gserviceaccount.com",
//     "client_id": "109788756718102095874",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/kaushal%40ringed-hallway-392006.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
//   ));

// const CONFIG = {
//     credentials: {
//         private_key: CREDENTIALS.private_key,
//         client_email: CREDENTIALS.client_email
//     }
// };

// const client = new vision.ImageAnnotatorClient(CONFIG);
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient({
    keyFilename: 'E:/Techsurf/server/ringed-hallway-392006-20ac20448302.json',
});

router.post("/autotagging", async (req, res) => {
    console.log(req.body);
    try {
        const base64 = req.body.base64;
        const imageBuffer = Buffer.from(base64, 'base64');

        const [result] = await client.annotateImage({
            image: { content: imageBuffer },
            features: [{ type: 'LABEL_DETECTION' }],
        });

        // console.log(result);
        // res.status(200).send(result);
        // const labels = result.labelAnnotations.map(label => label.description);

        const minConfidence = (req.body.Confidence) / 100; // desired minimum confidence threshold
        const filteredLabels = result.labelAnnotations.filter(label => label.score >= minConfidence);
        // const filteredLabelsDescription = filteredLabels.map(filteredLabel => filteredLabel.description);
        // console.log("line 48", typeof (filteredLabels), filteredLabels);

        const maxTags = req.body.maxtags; // desired maximum number of tags
        const sortedLabels = filteredLabels.sort((a, b) => b.score - a.score); // Sorting labels by score
        const limitedLabels = sortedLabels.slice(0, maxTags);
        const limitedLabelsDescription = limitedLabels.map(limitedLabel => limitedLabel.description);

        console.log(limitedLabelsDescription);
        res.status(200).send( limitedLabelsDescription );
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }

})
module.exports = router;