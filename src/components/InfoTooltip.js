import { useState, useEffect } from "react";
import doneImage from '../images/doneImage.svg';
import failImage from '../images/failImage.svg';

function InfoTooltip({name , isOpen, onClose, isComplete}) {
  const [data, setData] = useState({
    image: '',
    text:''
  });

  useEffect(() => {
    if(isComplete) {
      setData({
        image: doneImage,
        text: 'Вы успешно зарегистрировались!'
      });
    } else {
      setData({
        image: failImage,
        text: 'Что-то пошло не так! Попробуйте ещё раз.'
      })
    }
  }, [isComplete])

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__info">
        <img className="popup__info-img" src={data.image} alt={data.text}/>
        <h2 className="popup__info-text">{data.text}</h2>
      </div>
      <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip;