"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import FormData from "form-data";
import Link from "next/link";

export default function SidebarForm() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [quizLabel, setQuizLabel] = useState(null);
  const [quizCode, setQuizCode] = useState(null);

  const mathQuiz = () => {
    fetch('https://kornberg.thebearmarketingfirm.com/wp-json/get_form/v1/contact-form/13617/')
      .then(response => response.json())
      .then(data => {
        const parser = new DOMParser();
        const html = parser.parseFromString(data, 'text/html');
        const mathValue = html.querySelector('.wpcf7-quiz-label').textContent;
        const quizEnc = html.querySelector('[name="_wpcf7_quiz_answer_quiz-math"]').value;
        setQuizLabel(mathValue);
        setQuizCode(quizEnc)
      })
      .catch(error => {
        console.error('Error fetching quiz label:', error);
      });
  }

  useEffect(() => {
    mathQuiz();
  }, []);

  const submitContactForm = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('s-name', event.target.fname.value);
    formData.append('s-phone', event.target.fphone.value);
    formData.append('s-email', event.target.femail.value);
    formData.append('s-message', event.target.message.value);
    formData.append('quiz-math', event.target.quiz.value);
    formData.append('_wpcf7_quiz_answer_quiz-math', quizCode);
    formData.append('_wpcf7_unit_tag', 'wpcf7-f31-o1');

    await axios.post("https://kornberg.thebearmarketingfirm.com/wp-json/contact-form-7/v1/contact-forms/13617/feedback/", formData)
      .then((response) => {
        setData(response.data);
        mathQuiz();
        if (response.data?.status === "mail_sent") {
          router.push('/thank-you-sidebar');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextareaChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\s+/g, ' '); // Replace consecutive whitespaces with a single whitespace
    if (/^\s+$/.test(inputValue)) {
      inputValue = ''; // If yes, replace with an empty string
    }
    event.target.value = inputValue;
  };

  const handlePhoneChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Remove all non-digit characters
    input = input.slice(0, 10); // Limit input to 10 digits

    if (input.length > 3 && input.length <= 6) {
      input = input.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (input.length > 6) {
      input = input.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    }
    event.target.value = input;
  };

  const handleQuizChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); // Remove all non-digit characters
    input = input.slice(0, 2); // Limit input to 10 digits
    event.target.value = input;
  };

  return (
    <>      
      <div className="wpcf7 no-js">
        <form className={`wpcf7-form ${data?.status === "validation_failed" ? "invalid" : ""}`} noValidate="novalidate" onSubmit={submitContactForm}>

          <span className="wpcf7-form-control-wrap">
            <input className="form-control" placeholder="Name*" type="text" id="fname" name="fname" required />
            {data?.invalid_fields?.find((field) => field.field === "s-name")?.message && (<span className="wpcf7-not-valid-tip">{data.invalid_fields.find((field) => field.field === "s-name").message}</span>)}
          </span>
          <span className="wpcf7-form-control-wrap">
            <input className="form-control" placeholder="Phone*" type="text" id="phone" name="fphone" onChange={handlePhoneChange} required />
            {data?.invalid_fields?.find((field) => field.field === "s-phone")?.message && (<span className="wpcf7-not-valid-tip">{data.invalid_fields.find((field) => field.field === "s-phone").message}</span>)}
          </span>
          <span className="wpcf7-form-control-wrap">
            <input className="form-control" placeholder="Email*" type="email" id="femail" name="femail" required />
            {data?.invalid_fields?.find((field) => field.field === "s-email")?.message && (<span className="wpcf7-not-valid-tip">{data.invalid_fields.find((field) => field.field === "s-email").message}</span>)}
          </span>
          <span className="wpcf7-form-control-wrap">
            <textarea className="form-control wpcf7-textarea" id="message" name="message" placeholder="Message*" onChange={handleTextareaChange} required></textarea>
            {data?.invalid_fields?.find((field) => field.field === "f-message")?.message && (<span className="wpcf7-not-valid-tip">{data.invalid_fields.find((field) => field.field === "f-message").message}</span>)}
          </span>
          <span className="form-quiz">
            <span className="wpcf7-form-control-wrap">
              <label><span className="wpcf7-quiz-label" id="basic-addon1">{quizLabel}</span> <input onChange={handleQuizChange} className="wpcf7-quiz quiz form-control" id="quiz-math" type="text" name="quiz" required/></label>
            </span>
          </span>

          {data?.invalid_fields?.find((field) => field.field === "quiz-math")?.message && (<span className="wpcf7-not-valid-tip">{data.invalid_fields.find((field) => field.field === "quiz-math").message}</span>)}

          <p className="sidebar-form-acc">By clicking submit, you are agreeing to the <Link href="/disclaimer/" title="Disclaimer">Disclaimer</Link> and <Link href="/privacy-policy/" title="Privacy Policy">Privacy Policy</Link></p>

          <button className="btn btn-primary wpcf7-submit" type="submit">SUBMIT</button>
          {data && (<div className={`wpcf7-response-output wpcf7-display-${data.status}`}>{data.message}</div>)}
        </form>
      </div>
    </>
  );
}