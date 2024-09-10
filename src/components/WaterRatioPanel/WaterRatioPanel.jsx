import { useState } from 'react';
import { CgAdd } from 'react-icons/cg';
import css from './WaterRatioPanel.module.css';
import { AddWaterList } from '../TodayWaterList/AddWaterList.jsx';

const WaterRatioPanel = ({ progress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateWaterData = (amount, date) => {
    console.log(`Amount: ${amount}, Date: ${date}`);
    setIsModalOpen(false);
  };

  return (
		<div className={css.container}>
		<div className={css.progressBarContainer}>	
      <h2 className={css.title}>Today</h2>

      
        <div className={css.progressBar}>
          <div className={css.progress} style={{ width: `${progress}%` }} />
          <div
            className={css.thumb}
            style={{ left: `calc(${progress}% - 7px)` }}
          />

          <div className={css.marks}>
            <span className={css.mark} style={{ left: '0%' }} />
            <span className={css.mark} style={{ left: '50%' }} />
            <span className={css.mark} style={{ left: '100%' }} />
          </div>

          <div className={css.progressTextNumber}>
            <span className={css.progressText}>0%</span>
            <span className={css.progressText}>50%</span>
            <span className={css.progressText}>100%</span>
          </div>
        </div>
      </div>
      <button className={css.addWaterButton} onClick={toggleModal}>
        <CgAdd className={css.icon} /> Add Water
      </button>

      {isModalOpen && (
        <div className={css.modalOverlay}>
          <AddWaterList
            initialAmount={0}
            initialDate={new Date()}
            updateWaterData={updateWaterData}
            onClose={toggleModal}
          />
        </div>
      )}
    </div>
  );
};

export default WaterRatioPanel;
