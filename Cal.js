// //calculator:
// import React, { useState } from 'react';
// import './cal.css';


// function Cal() {
//   const [input, setInput] = useState('');
//   const [result, setResult] = useState('');

//   const handleClick = (e) => {
//     setInput(input.concat(e.target.name));
//   };

//   const clear = () => {
//     setInput('');
//     setResult('');
//   };

//   const backspace = () => {
//     setInput(input.slice(0, -1));
//   };

//   const calculate = () => {
//     try {
//       setResult(eval(input).toString());
//     } catch (error) {
//       setResult('Error');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="calculator">
//         <form>
//           <input type="text" value={input} placeholder="0" readOnly />
//           <input type="text" value={result} placeholder="Result" readOnly />
//         </form>

//         <div className="keypad">
//           <button className="highlight" onClick={clear} id="clear">
//             Clear
//           </button>
//           <button className="highlight" onClick={backspace} id="backspace">
//             C
//           </button>
//           <button className="highlight" name="/" onClick={handleClick}>
//             &divide;
//           </button>
//           <button name="7" onClick={handleClick}>
//             7
//           </button>
//           <button name="8" onClick={handleClick}>
//             8
//           </button>
//           <button name="9" onClick={handleClick}>
//             9
//           </button>
//           <button className="highlight" name="*" onClick={handleClick}>
//             &times;
//           </button>
//           <button name="4" onClick={handleClick}>
//             4
//           </button>
//           <button name="5" onClick={handleClick}>
//             5
//           </button>
//           <button name="6" onClick={handleClick}>
//             6
//           </button>
//           <button className="highlight" name="-" onClick={handleClick}>
//             &ndash;
//           </button>
//           <button name="1" onClick={handleClick}>
//             1
//           </button>
//           <button name="2" onClick={handleClick}>
//             2
//           </button>
//           <button name="3" onClick={handleClick}>
//             3
//           </button>
//           <button className="highlight" name="+" onClick={handleClick}>
//             +
//           </button>
//           <button name="0" onClick={handleClick}>
//             0
//           </button>
//           <button name="." onClick={handleClick}>
//             .
//           </button>
//           <button className="highlight" onClick={calculate} id="result">
//             =
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cal;



// form:


import React, { useState } from 'react';
import './form.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Cal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = () => {
    let errors = {};
    let emailRegex = /\S+@\S+\.\S+/;
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    } else {
      setFormErrors(errors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">User Information Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={formErrors.name ? 'error' : ''}
              placeholder="Enter your name"
            />
            {formErrors.name && <p className="error-msg"><FaTimesCircle /> {formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={formErrors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {formErrors.email && <p className="error-msg"><FaTimesCircle /> {formErrors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={formErrors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
            />
            {formErrors.phone && <p className="error-msg"><FaTimesCircle /> {formErrors.phone}</p>}
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {isSubmitted && (
          <p className="success-msg">
            <FaCheckCircle /> Form submitted successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default Cal;




// //resume :

// import React, { useState } from 'react';
// import './resume.css';  // Ensure this points to your CSS file

// function Cal() {
//   const [formData, setFormData] = useState({
//     name: '',
//     professionalSummary: '',
//     education: '',
//     academicSkills: '',
//     nonAcademicSkills: '',
//     careerObjective: '',
//     experience: '',
//     internships: '',
//     achievements: ''
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [submittedData, setSubmittedData] = useState(null); // To store the submitted resume data

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSuccessMessage('Resume created successfully!');
//     setSubmittedData(formData); // Store submitted data to display
//   };

//   return (
//     <div className="resume-builder-container">
//       <div className="form-container">
//         <h1>Resume Builder</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Full Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="professionalSummary">Professional Summary:</label>
//             <textarea
//               id="professionalSummary"
//               name="professionalSummary"
//               value={formData.professionalSummary}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="education">Education Qualifications:</label>
//             <textarea
//               id="education"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="academicSkills">Academic Skills:</label>
//             <textarea
//               id="academicSkills"
//               name="academicSkills"
//               value={formData.academicSkills}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="nonAcademicSkills">Non-Academic Skills:</label>
//             <textarea
//               id="nonAcademicSkills"
//               name="nonAcademicSkills"
//               value={formData.nonAcademicSkills}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="careerObjective">Career Objective:</label>
//             <textarea
//               id="careerObjective"
//               name="careerObjective"
//               value={formData.careerObjective}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="experience">Experience:</label>
//             <textarea
//               id="experience"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="internships">Internships:</label>
//             <textarea
//               id="internships"
//               name="internships"
//               value={formData.internships}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="achievements">Skills and Achievements:</label>
//             <textarea
//               id="achievements"
//               name="achievements"
//               value={formData.achievements}
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit">Submit</button>
//         </form>

//         {successMessage && <div className="success-message">{successMessage}</div>}
//       </div>

//       {submittedData && (
//         <div className="resume-display">
//           <h2>Your Resume</h2>
//           <div className="resume-section">
//             <h3>Name:</h3>
//             <p>{submittedData.name}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Professional Summary:</h3>
//             <p>{submittedData.professionalSummary}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Education Qualifications:</h3>
//             <p>{submittedData.education}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Academic Skills:</h3>
//             <p>{submittedData.academicSkills}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Non-Academic Skills:</h3>
//             <p>{submittedData.nonAcademicSkills}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Career Objective:</h3>
//             <p>{submittedData.careerObjective}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Experience:</h3>
//             <p>{submittedData.experience}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Internships:</h3>
//             <p>{submittedData.internships}</p>
//           </div>
//           <div className="resume-section">
//             <h3>Skills and Achievements:</h3>
//             <p>{submittedData.achievements}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cal;

// import React, { useState } from 'react';
// import axios from 'axios';

// function Cal() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [error, setError] = useState('');

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!file) {
//             setError('Please select an image');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.data.error) {
//                 setError(response.data.error);
//             } else {
//                 setResult(`Result: ${response.data.result}, Pneumonia: ${response.data.pneumonia_percentage}, Normal: ${response.data.normal_percentage}`);
//             }
//         } catch (error) {
//             console.error('Error occurred:', error);
//             setError('An error occurred while processing your request');
//         }
//     };

//     return (
//         <div>
//             <h1>Pneumonia Detection</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//                 <button type="submit">Predict</button>
//             </form>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             {result && <div>{result}</div>}
//         </div>
//     );
// }

// export default Cal;

