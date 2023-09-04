import React, { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { transliterate as tr, slugify } from 'transliteration';
import axios from 'axios'; 
import translate from "translate";

import "./Pages/Ocr/ocr.css"
const ImageUpload = (props) => {

    const [t] = useTranslation("global")

    const [image1, setImage1] = useState("images/CIN1.png");
    const [image2, setImage2] = useState("images/CIN2.png");
    const [count, setCount] = useState(0);
    const [values, setValues] = useState({
        name: '', surname: '',
        email: '', phone_number: '', country: '',
        city: '', address: '', cin_number: '',
        birth_date: '', zipCode: '', gender:'' ,
        job: '', motherName: '', NID_creation_date: ''
    })

 
  // handle the language change  
  async function onLanguageChange(language) {

    // arabic variables 
    // try {

    //   if (language == 'ar') {
    //     // aabic variables  
    //     const ar_mother_name = await translate(values.motherName, { from: 'en', to: 'ar' });
    //     const ar_job = await translate(values.job, { from: 'en', to: 'ar' });
    //     const ar_address = await translate(values.address, { from: 'en', to: 'ar' });
    //     const ar_NID_date = await translate(values.NID_creation_date, { from: 'en', to: 'ar' });
    //     console.log(ar_mother_name)

    //     setValues(prevValues => ({

    //       ...prevValues,
    //       motherName: ar_mother_name,
    //       job: ar_job,
    //       address: ar_address,
    //       NID_creation_date: ar_NID_date
    //     }));

    //   }

    //   if (language == 'en') {
    //     // English variables  
    //     const en_mother_name = await tr(values.motherName);
    //     const en_job = await translate(values.job, { from: 'ar', to: 'en' });
    //     const en_address = await translate(values.address, { from: 'ar', to: 'en' });
    //     const en_NID_date = await translate(values.NID_creation_date, { from: 'ar', to: 'en' });

    //     setValues(prevValues => ({

    //       ...prevValues,
    //       motherName: en_mother_name,
    //       job: en_job,
    //       address: en_address,
    //       NID_creation_date: en_NID_date, 
    //       name: values.name,
    //       surname:values.surname,
    //       birth_Date:values.birth_date,
    //       city: values.city,
    //       cin_number: values.cin_number,

    //     }));

    //   }
    // }
    // catch (err) {
    //   console.log("catch it ", err)
    // }
  }

    const handleImageChange = async (event, setImageFunction) => {

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageFunction(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        //  If the front cin is selected 
        if (event.target.id == "image-upload1") {
            props.handleLoadingFrontTrue() 
       
            try {
                // send axios request to the server


                const response = await axios.post('http://localhost:5000/flask_api/front_image_info', formData);
                // Detect language selection 
                props.handleLoadingFrontFalse() 
                console.log("the frot respone is ", response)
                
                // if (props.language === 'ar') {
                    setValues(prevValues => ({
                        ...prevValues,
                        name: response.data.data.cr_name1 + response.data.data.cr_name2,
                        surname: response.data.data.cr_surname,
                        birth_date: response.data.data.cr_birthDate,
                        city: response.data.data.cr_state,
                        cin_number: (response.data.data.cr_number),
                    }));

                // }
                // else {
                //     const en_name = await tr(response.data.data.cr_name1 + response.data.data.cr_name2)
                //     const en_surname = await translate(response.data.data.cr_surname, { from: 'ar', to: 'en' },);
                //     const en_birth_Date = await translate(response.data.cr_birthDate, { from: 'ar', to: 'en' });
                //     const en_city = await translate(response.data.data.cr_state, { from: 'ar', to: 'en' });
                //     const en_cin_number = await translate(response.data.data.cr_number, { from: 'ar', to: 'en' });

                //     setValues(prevValues => ({
                //         ...prevValues,
                //         name: en_name,
                //         surname: en_surname,
                //         birth_Date: en_birth_Date,
                //         city: en_city,
                //         cin_number: en_cin_number,
                //     }));
                //     const add = count;
                //     setCount(add);
                //     console.log("is this result is beeing red ", count);

                // }
            }
            catch (error) {
                console.error(error);
            }
        }
        
        if (event.target.id == "image-upload2") {
        try {

            props.handleLoadingBack()
            const response = await axios.post('http://localhost:5000/flask_api/back_image_info', formData);
            console.log("the response is ", response)

            //  translate all the items in the form
            // await translate(  response.data.data.mother_name, { from: 'ar', to: 'en' });


            // if (props.language === 'ar') {
                setValues(prevValues => ({
                    ...prevValues,
                    motherName: response.data.data.mother_name,
                    job: response.data.data.work,
                    address: response.data.data.address,
                    NID_creation_date: response.data.data.creation_date,

                }));
            // }
            // else {
            //     const trans_mother_name = await tr(response.data.data.mother_name)
            //     const trans_work = await translate(response.data.data.work, { from: 'ar', to: 'en' });
            //     const trans_address = await translate(response.data.data.address, { from: 'ar', to: 'en' });
            //     const trans_NID_creation_date = await translate(response.data.data.creation_date, { from: 'ar', to: 'en' });
            //     setValues(prevValues => ({
            //         ...prevValues,
            //         motherName: trans_mother_name,
            //         job: trans_work,
            //         address: trans_address,
            //         NID_creation_date: trans_NID_creation_date,
            //     }));

            // }
        }
        catch (err) {
            console.log("the error is", err);
        }
    }}
// Execute language change function if language change 
useEffect(()=>{
    onLanguageChange(props.language)
},[props.language])

// Execute language change function if language change 
useEffect(()=>{
    props.getCinData(values); 
    
},[values])
  

    return (
        <Fragment>
            <div className="images-container row">
                <div className="col-md-6">
                    <div className="image-with-button">
                        <label htmlFor="image-upload1">
                            {/* croppedImage || */}
                            <img src={image1} alt="Image 1"
                            />
                            <span className="blue-button">{t('Download')}</span>
                            {/* <button className='btn btn-primary' onClick={() => setModalIsOpen(true)}>Crop</button> */}
                            {/*  model */}
                            {/*  ?????????????????? this is the place of Yasmine croping code      ??????????????? */}
                            {/*  */}
                            {/* finmodel */}
                        </label>
                        {/* Added code bby Ahmed   */}
                        <input
                            type="file"
                            id="image-upload1"
                            name="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setImage1)}
                            style={{ display: "none" }}
                        />


                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-with-button">
                        <label htmlFor="image-upload2">
                            <img src={image2} alt="Image 2" />
                            <span className="blue-button">{t('Download')}</span>
                        </label>
                        <input
                            type="file"
                            id="image-upload2"
                            name="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setImage2)}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )

}
export default ImageUpload; 