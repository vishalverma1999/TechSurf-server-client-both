# TechSurf-server-client-both

This project is developed as task to complete the round 3- prototype submission of the hackathon named as Techsurf. Shortlisted candidates have to submit their prototypes based on the problem statement.
problem statement-1(mine): -
Design and develop a full stack app on Digital Asset Management (DAM) that incorporates several features while leveraging the capabilities of both the browser and AI? Please provide an overview of your approach, including the technologies you would utilize and provide working code samples demonstrating how you would achieve the following tasks:

In-browser Image Transformation:
●	Crop
●	Transform
●	Focal Point
●	Effects(brightness, etc)
●	Overlay
●	Frames(padding)

AI-powered Image Analysis and Tagging:
Utilize AI algorithms to analyze and automatically tag images based on their content, such as objects, scenes, or concepts.

Image Optimization:
Implement techniques for image optimization, such as compression and format conversion, to enhance the performance and loading speed of images.
Metadata Management:

Please provide detailed explanations of your approach and share working code examples that demonstrate your implementation of these features within the full stack app on DAM.
************************************************************************************************************************************************************************************

For this project 
16.13.1 node version is used.
npm version -> 8.1.2

1)git clone from github

# Server side:-
1) npm install --> To install dependecies
2) I have used google vision api for image tagging(can't upload the api key on github, otherwise it will be revoked immediately)
3) we can generate a new google vision api key and then put the path of the dowloaded json file as a value to the key "keyFilename". See below image as shown in the figure. 

		![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/be310737-4a95-4109-bd23-f30acafc4a1c)
In the above image ringed-hallway-392006-20ac20448302.json is the file that you get after successfully enabling the google vision cloud api.
After this we need to provide it in the api like shown in the below image.

![Screenshot 2023-08-28 054505](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/a428fedc-c813-4476-a7a1-3bf2aae8f546)

4) You can refer to this article for how to create google vision cloud api--> https://morioh.com/a/0tNONZvfChiS/nodejs-google-cloud-vision-api-examples

5) for image upload and compression multer and sharp library is used.
6) nodemon index.js --> to successfully run the server.

# Client Side:-
1) npm install --> To install dependecies
2) npm install --legacy-peer-deps --> in case if problem in installation, then use this command
3) npm start --> to run the frontend 
4) if npm start doesn't works and shows 'ERRCODESTACK' then change the start script in package.json. change it to      "start": "react-scripts --openssl-legacy-provider start"   FROM   "start": "react-scripts start". THIS error may occur possibly if node version using is > 17.

		![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/cc6eef62-33f8-4369-8968-0981ceb1fa33)
FROM above to 
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/cf983276-d716-42be-ac7f-6325b7025e77)



********************************************************************************************************************************************************************

# After successful configuration both client and server will run
Using 'choose image' - image can be uploaded
Now we can apply different editing effects availabe like rotate, flip, brightness etc.
We can also generate tags related to image using "Auto Tag" button
After done editing image can be exported:-
	1) Download --> download the edited image to lacal machine
	2) Save as copy--> image will be compressed, uploaded and then stored to mongoDB for 		                future use. For compression sharp and for uploading Multer is used.

Below there is a croper component which can be used to crop the images. It can also be used to zoom in the image.
Download button in cropper component to download the image.

# RESULTS:-
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/5a462ef5-98d3-4598-9635-e9b591c16e32)
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/ddf10e8a-a175-4bca-880b-08396be24c6b)
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/cdacfb0c-c426-42fb-9b7b-0b7353226ef4)
Play with effects, rotate, brightness etc.
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/9260a5f7-7c16-4b1d-aa77-c8acb12adcf0)

export button - download or save as copy
if done save as copy then iamge will be save to db:- 
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/52ce0d7c-9108-4bb6-9abf-e4b664b5191b)
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/d005c984-013e-4e47-b69e-000f99385221)

## AutoTagging
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/db5d894a-8bae-4853-a884-542d87953530)

## using Cropper
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/8cc138d9-b653-40cf-8b1d-c74d7003ec7e)
## Zoomed in and the part inside cropper will be cropped
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/bb6b60ef-6aec-422b-85d3-1f050d79d99f)
## This is the result after cropping
![image](https://github.com/vishalverma1999/TechSurf-server-client-both/assets/56078981/5833b279-59b4-4076-9d14-adadd05a1b51)



## TO DO IN FURURE:-
1) Display the edited images saved in db to the frontend. Images will load faster since they are first compressed and then stored
2) applying compression at frontend side also to further enhance the performance .
3) Metadata--> it can be done through the sharp library only. metadata method parses all the metadata associated with the image.
4) Use this metadata to filter and sort the images displaying at frontend side.
5) Functionality to store Multiple versions of the same file.
