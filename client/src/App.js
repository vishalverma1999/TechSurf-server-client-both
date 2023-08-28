// import { useState } from 'react';
// import './App.css';
// import { GrRotateLeft } from 'react-icons/gr';
// import { GrRotateRight } from 'react-icons/gr';
// import { BiReflectVertical } from 'react-icons/bi';
// import { BiReflectHorizontal } from 'react-icons/bi';
// import defaultImg from './Image/image-placeholder.jpg'
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'

// function App() {
//   const [brightness, setBrightness] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [inversion, setInversion] = useState(0);
//   const [grayscale, setGrayscale] = useState(0);
//   const [rotate, setRotate] = useState(0);
//   const [flipHorizontal, setFlipHorizontal] = useState(1);
//   const [flipVertical, setFlipVertical] = useState(1);
//   const [sliderValue, setSliderValue] = useState('100');
//   const [img, setImg] = useState();
//   const [filterBtn, setFilterBtn] = useState("Brightness");
//   // crop method from react-image-crop
//   const [src, selectFile] = useState(null);
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ aspect: 16 / 9 });
//   const [result, setResult] = useState(null);



//   function getCroppedImg() {
//     if (image) {
//       const canvas = document.createElement('canvas');
//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;
//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext('2d');

//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height,
//       );

//       const base64Image = canvas.toDataURL('image/jpeg');
//       setResult(base64Image);

//     }


//   }




//   const chooseFile = () => {
//     let fileInput = document.querySelector("#file_input");
//     // console.log(fileInput);
//     // console.log(fileInput.click());
//     fileInput.click();
//   }

//   const applyFilter = () => {
//     let image = document.querySelector(".image img");
//     image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//     image.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
//   }

//   const imgFilter = (e) => {
//     let id = e.target.id;
//     if (id === "brightness") {
//       setFilterBtn("Brightness");
//       setSliderValue(brightness);
//     } else if (id === "saturation") {
//       setFilterBtn("Saturation");
//       setSliderValue(saturation);
//     } else if (id === "inversion") {
//       setFilterBtn("Inversion");
//       setSliderValue(inversion);
//     } else if (id === "grayscale") {
//       setFilterBtn("Grayscale");
//       setSliderValue(grayscale);
//     }
//   }
//   const handleSlider = (e) => {
//     setSliderValue(e.target.value);
//     switch (filterBtn) {
//       case "Brightness":
//         setBrightness(e.target.value);
//         break;
//       case "Saturation":
//         setSaturation(e.target.value);
//         break;
//       case "Inversion":
//         setInversion(e.target.value);
//         break;
//       default:
//         setGrayscale(e.target.value);
//     }
//     applyFilter();
//   }
//   const imgRotate = (e) => {
//     let id = e.target.id;
//     if (id === "left") {
//       setRotate(rotate - 90);
//     } else if (id === "right") {
//       setRotate(rotate + 90);
//     } else if (id === "vertical") {
//       setFlipVertical(flipVertical === 1 ? -1 : 1);
//     } else {
//       setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
//     }
//     applyFilter();
//   }

//   const loadImg = (e) => {
//     let file = e.target.files[0];
//     if (!file) {
//       console.log("no file available");
//       return;
//     }
//     setImg(file);
//     const imgElement = new Image();
//     imgElement.src = URL.createObjectURL(file);
//     setImage(imgElement);
//     selectFile(URL.createObjectURL.file);
//     resetFilter();
//   }
//   const saveImage = () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const image = new Image();
//     image.onload = () => {
//       canvas.width = image.naturalWidth;
//       canvas.height = image.naturalHeight;
//       ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//       ctx.translate(canvas.width / 2, canvas.height / 2);
//       if (rotate !== 0) {
//         ctx.rotate((rotate * Math.PI) / 180);
//       }
//       ctx.scale(flipHorizontal, flipVertical);
//       ctx.drawImage(
//         image,
//         -canvas.width / 2,
//         -canvas.height / 2,
//         canvas.width,
//         canvas.height
//       );
//       const link = document.createElement("a");
//       link.download = "img.jpg";
//       link.href = canvas.toDataURL();
//       link.click();
//     };
//     image.src = URL.createObjectURL(img);
//   };


//   const resetFilter = () => {
//     setBrightness("100");
//     setSaturation("100");
//     setInversion("0");
//     setGrayscale("0");
//     setRotate(0);
//     setFlipHorizontal(1);
//     setFlipVertical(1);
//     setFilterBtn("Brightness");
//     setSliderValue(100);
//   }

//   if (img) applyFilter();
//   return (
//     <>
//       <main>
//         <div className={`container ${!img ? "disable" : ""}`}>
//           <h1>Image Editor</h1>
//           <div className="content">
//             <div className="image">
//               <img src={img ? URL.createObjectURL(img) : defaultImg} alt="img" />
//             </div>
//             <div className="editor_panel">
//               <div className="filter">
//                 <label>Filters</label>
//                 <div className="options">
//                   <button id="brightness" className={filterBtn === "Brightness" ? "active" : ""} onClick={imgFilter}>Brightness</button>
//                   <button id="saturation" className={filterBtn === "Saturation" ? "active" : ""} onClick={imgFilter}>Saturation</button>
//                   <button id="inversion" className={filterBtn === "Inversion" ? "active" : ""} onClick={imgFilter}>Inversion</button>
//                   <button id="grayscale" className={filterBtn === "Grayscale" ? "active" : ""} onClick={imgFilter}>Grayscale</button>
//                 </div>
//                 <div className="slider">
//                   <div className="filter_info">
//                     <span className="name">{filterBtn}</span>
//                     <span className="value">{sliderValue}%</span>
//                   </div>
//                   <input type="range" value={sliderValue} min="0" max={
//                     filterBtn === "Brightness" || filterBtn === "Saturation"
//                       ? "200"
//                       : "100"
//                   } onChange={handleSlider} />
//                 </div>
//               </div>
//               <div className="rotate">
//                 <label>Rotate & Flip</label>
//                 <div className="options">
//                   <button id="left" onClick={imgRotate}><GrRotateLeft id="left" /></button>
//                   <button id="right" onClick={imgRotate}><GrRotateRight id="right" /></button>
//                   <button id="vertical" onClick={imgRotate}><BiReflectVertical id="vertical" /></button>
//                   <button id="horizontal" onClick={imgRotate}><BiReflectHorizontal id="horizontal" /></button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="control">
//             <div className="row">
//               <input type="file" id="file_input" accept="image/*" hidden onChange={loadImg} />
//               <button type="button" id="choose_img" onClick={chooseFile}>Choose Image</button>
//               <button type="button" id="save_img" onClick={saveImage}>Save Image</button>
//             </div>
//             <button type='reset' id="reset_filter" onClick={resetFilter}>Reset Filters</button>
//           </div>
//         </div>
//       </main>
//       <div style={{ height: "100px", width: "100vw", padding: "10px", border: "2px solid red" }}>
//         {
//           img && <div>
//             (<ReactCrop src={src} crop={crop} onChange={setCrop} onImageLoaded={setImage} />)
//             <button onClick={getCroppedImg} >Crop Image</button>
//           </div>
//         }

//       </div>
//       {
//         result && <div>
//           <img src={result} alt='Cropped Img' />
//         </div>
//       }
//     </>
//   );
// }

// export default App;


// import { useState } from 'react';
// import './App.css';
// import { GrRotateLeft } from 'react-icons/gr';
// import { GrRotateRight } from 'react-icons/gr';
// import { BiReflectVertical } from 'react-icons/bi';
// import { BiReflectHorizontal } from 'react-icons/bi';
// import defaultImg from './Image/image-placeholder.jpg'

// function App() {
//   const [brightness, setBrightness] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [inversion, setInversion] = useState(0);
//   const [grayscale, setGrayscale] = useState(0);
//   const [rotate, setRotate] = useState(0);
//   const [flipHorizontal, setFlipHorizontal] = useState(1);
//   const [flipVertical, setFlipVertical] = useState(1);
//   const [sliderValue, setSliderValue] = useState('100');
//   const [img, setImg] = useState();
//   const [filterBtn, setFilterBtn] = useState("Brightness");

//   const chooseFile = () => {
//     let fileInput = document.querySelector("#file_input");
//     fileInput.click();
//   }

//   const applyFilter = () => {
//     let image = document.querySelector(".image img");
//     image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//     image.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
//   }

//   const imgFilter = (e) => {
//     let id = e.target.id;
//     if (id === "brightness") {
//       setFilterBtn("Brightness");
//       setSliderValue(brightness);
//     } else if (id === "saturation") {
//       setFilterBtn("Saturation");
//       setSliderValue(saturation);
//     } else if (id === "inversion") {
//       setFilterBtn("Inversion");
//       setSliderValue(inversion);
//     } else if (id === "grayscale") {
//       setFilterBtn("Grayscale");
//       setSliderValue(grayscale);
//     }
//   }
//   const handleSlider = (e) => {
//     setSliderValue(e.target.value);
//     switch (filterBtn) {
//       case "Brightness":
//         setBrightness(e.target.value);
//         break;
//       case "Saturation":
//         setSaturation(e.target.value);
//         break;
//       case "Inversion":
//         setInversion(e.target.value);
//         break;
//       default:
//         setGrayscale(e.target.value);
//     }
//     applyFilter();
//   }
//   const imgRotate = (e) => {
//     let id = e.target.id;
//     if (id === "left") {
//       setRotate(rotate - 90);
//     } else if (id === "right") {
//       setRotate(rotate + 90);
//     } else if (id === "vertical") {
//       setFlipVertical(flipVertical === 1 ? -1 : 1);
//     } else {
//       setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
//     }
//     applyFilter();
//   }

//   const loadImg = (e) => {
//     let file = e.target.files[0];
//     if (!file) return;
//     setImg(file);
//     resetFilter();
//   }
//   const saveImage = () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const image = new Image();
//     image.onload = () => {
//       canvas.width = image.naturalWidth;
//       canvas.height = image.naturalHeight;
//       ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
//       ctx.translate(canvas.width / 2, canvas.height / 2);
//       if (rotate !== 0) {
//         ctx.rotate((rotate * Math.PI) / 180);
//       }
//       ctx.scale(flipHorizontal, flipVertical);
//       ctx.drawImage(
//         image,
//         -canvas.width / 2,
//         -canvas.height / 2,
//         canvas.width,
//         canvas.height
//       );
//       const link = document.createElement("a");
//       link.download = "img.jpg";
//       link.href = canvas.toDataURL();
//       link.click();
//     };
//     image.src = URL.createObjectURL(img);
//   };


//   const resetFilter = () => {
//     setBrightness("100");
//     setSaturation("100");
//     setInversion("0");
//     setGrayscale("0");
//     setRotate(0);
//     setFlipHorizontal(1);
//     setFlipVertical(1);
//     setFilterBtn("Brightness");
//     setSliderValue(100);
//   }

//   if (img) applyFilter();
//   return (
//     <>
//       <main>
//         <div className={`container ${!img ? "disable" : ""}`}>
//           <h1>Image Editor</h1>
//           <div className="content">
//             <div className="image">
//               <img src={img ? URL.createObjectURL(img) : defaultImg} alt="img" />
//             </div>
//             <div className="editor_panel">
//               <div className="filter">
//                 <label>Filters</label>
//                 <div className="options">
//                   <button id="brightness" className={filterBtn === "Brightness" ? "active" : ""} onClick={imgFilter}>Brightness</button>
//                   <button id="saturation" className={filterBtn === "Saturation" ? "active" : ""} onClick={imgFilter}>Saturation</button>
//                   <button id="inversion" className={filterBtn === "Inversion" ? "active" : ""} onClick={imgFilter}>Inversion</button>
//                   <button id="grayscale" className={filterBtn === "Grayscale" ? "active" : ""} onClick={imgFilter}>Grayscale</button>
//                 </div>
//                 <div className="slider">
//                   <div className="filter_info">
//                     <span className="name">{filterBtn}</span>
//                     <span className="value">{sliderValue}%</span>
//                   </div>
//                   <input type="range" value={sliderValue} min="0" max={
//                     filterBtn === "Brightness" || filterBtn === "Saturation"
//                       ? "200"
//                       : "100"
//                   } onChange={handleSlider} />
//                 </div>
//               </div>
//               <div className="rotate">
//                 <label>Rotate & Flip</label>
//                 <div className="options">
//                   <button id="left" onClick={imgRotate}><GrRotateLeft id="left" /></button>
//                   <button id="right" onClick={imgRotate}><GrRotateRight id="right" /></button>
//                   <button id="vertical" onClick={imgRotate}><BiReflectVertical id="vertical" /></button>
//                   <button id="horizontal" onClick={imgRotate}><BiReflectHorizontal id="horizontal" /></button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="control">
//             <div className="row">
//               <input type="file" id="file_input" accept="image/*" hidden onChange={loadImg} />
//               <button type="button" id="choose_img" onClick={chooseFile}>Choose Image</button>
//               <button type="button" id="save_img" onClick={saveImage}>Save Image</button>
//             </div>
//             <button type='reset' id="reset_filter" onClick={resetFilter}>Reset Filters</button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;


import React from "react";
import ImageEffectsEditor from "./components/ImageEffectsEditor/ImageEffectsEditor";
import './App.css'
import Crop from "./components/Cropper/Crop";

export default function App() {
	return (
		<>
			<ImageEffectsEditor />
			<hr style={{color: "white", width:"90vw", margin: "auto", border: "3px solid green",   marginTop: "50px", marginBottom: "50px"}}></hr>
			<Crop/>
			<hr style={{color: "white", width:"90vw", margin: "auto", border: "3px solid green",   marginTop: "50px", marginBottom: "50px"}}></hr>
			{/* <PrevEditedImages/> */}
		</>
	);
}