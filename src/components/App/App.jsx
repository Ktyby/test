import React, { useState, useEffect, useRef, useCallback } from 'react';
import getPictureUrl from '../../utils/getPictureUrl';

import Modal from '../Modal';

import './style.css';

const App = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [picturesUrls, setPicturesUrls] = useState([]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedPictureUrl, setSelectedPictureUrl] = useState('');
  const [pictureSizes, setPictureSizes] = useState([0, 0]);
  const canvasElement = useRef(null);

  useEffect(() => {
    if (canvasElement.current && selectedPictureUrl) {
      const context = canvasElement.current.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedPictureUrl;
      const ratio = pictureSizes[0] / pictureSizes[1];
      const height = 600 / ratio;
      const shift = (height - 300) / 2;
      img.onload = () => {
        context.drawImage(img, 0, -shift, 600, height);
        context.font = '48px serif';
        context.textAlign = 'center';
        context.fillText(topText, 300, 50);
        context.fillText(bottomText, 300, 300);
      };
    }
  }, [topText, bottomText, selectedPictureUrl]);

  const handleTakePicture = async () => {
    setDisplayModal(true);
    const pictures = await getPictureUrl();
    setPicturesUrls(pictures);
  };

  const handleModalClose = () => {
    setDisplayModal(false);
    setPicturesUrls([]);
  };

  const handleChangeText = (evt) => {
    if (evt.target.id === 'firstText') {
      setTopText(evt.target.value);
    } else {
      setBottomText(evt.target.value);
    }
  };

  const handleSelectPicture = (evt) => {
    setDisplayModal(false);
    setPictureSizes([evt.target.naturalWidth, evt.target.naturalHeight]);
    setSelectedPictureUrl(evt.target.src);
    setPicturesUrls([]);
  };

  const handleDownloadImage = useCallback(() => {
    if (canvasElement.current) {
      const createEl = document.createElement('a');
      createEl.href = canvasElement.current.toDataURL('image/jpeg', 0.5);
      createEl.download = 'picture';
      createEl.click();
      createEl.remove();
    }
  }, [canvasElement.current]);

  return (
    <div className="main">
      <div className="main__container">
        <input type="text" id="firstText" onChange={handleChangeText} />
        <input type="text" id="secondText" onChange={handleChangeText} />
        <canvas ref={canvasElement} width={600} height={300}></canvas>
        {selectedPictureUrl && (
          <button onClick={handleDownloadImage}>Скачать изображение</button>
        )}
        <button onClick={handleTakePicture}>Выбрать изображение</button>
      </div>
      {displayModal && (
        <Modal onClose={handleModalClose} title="Выбрать изображение">
          <div className="pictures__contrainer">
            {picturesUrls.map((url) => (
              <img
                src={url}
                alt="random picture"
                width={150}
                height={150}
                key={url}
                onClick={handleSelectPicture}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
