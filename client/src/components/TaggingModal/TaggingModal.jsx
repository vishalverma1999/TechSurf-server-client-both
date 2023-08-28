import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

export default function TaggingModal(props) {
    const [base64Image, setBase64Image] = useState("");
    const [responseText, setResponseText] = useState();
    const [sliderValue, setSliderValue] = useState(70);
    const [maxtags, setMaxTags] = useState(5);
    const [tags, setTags] = useState([])

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleSliderTags = (event) => {
        setMaxTags(event.target.value);
    };



    const createBadge = (label, index) => {
        return <h2 key={index}>
            <Badge
                style={{ marginLeft: "10px" }}
                bg="primary">{label}</Badge>
        </h2>
    }

    const autoTag = async (Confidence, maxtags) => {
        console.log("auto tag clicked");
        // setModalShow(false);
        // console.log(Confidence,maxtags);
        // convert the image file to base64 image
        const reader = new FileReader();
        reader.readAsDataURL(props.img);
        reader.onload = async () => {
            setBase64Image(reader.result);
            // console.log('Base64 Image:', reader.result); // Log the base64-encoded image data

            // api request
            const base64 = reader.result.split(',')[1];
            console.log(base64);
            try {
                const response = await axios.post('http://localhost:9000/api/image/autotagging', {
                    base64, Confidence, maxtags
                });
                console.log(response);
                if (response.status === 200) {
                    const result = response.data;
                    setResponseText(result);
                    console.log(result);
                    const labels = result;
                    setTags(labels);
                } else {
                    setResponseText('Error processing image');
                }
            } catch (error) {
                console.error('Error processing image:', error);
                setResponseText('Error processing image');
            }
        };
    };



    return (


        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Auto Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="tags" style={{ display: "flex", flexWrap: "wrap" }}>
                    {tags.map(createBadge)}
                </div>
                <h4>
                    Confidence Score <br />{sliderValue}
                </h4>

                <Form.Range
                    value={sliderValue}
                    onChange={handleSliderChange}
                    min={10}
                    max={100}
                    step={1}
                />

                <h4>
                    Max Tags <br /> {maxtags}
                </h4>

                <Form.Range
                    value={maxtags}
                    onChange={handleSliderTags}
                    min={1}
                    max={30}
                    step={1}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => autoTag(sliderValue, maxtags)}>Add Auto Tags</Button>

                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>



    );
}

