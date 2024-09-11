import { useState } from 'react';
// import { CgAdd } from 'react-icons/cg';

// // import { AddWaterList } from '../TodayWaterList/AddWaterList.jsx';


// const WaterRatioPanel = ({ progress }) => {




//   return (
//     <div className={ }>

//       <div className={ }>
//         <div className={ }>
//           <div className={css.progress} style={{ width: `${progress}%` }} />
//           <div
//             className={css.thumb}
//             style={{ left: `calc(${progress}% - 7px)` }}
//           />

//           <div className={css.marks}>
//             <span className={css.mark} style={{ left: '0%' }} />
//             <span className={css.mark} style={{ left: '50%' }} />
//             <span className={css.mark} style={{ left: '100%' }} />
//           </div>

//           <div className={css.progressTextNumber}>
//             <span className={css.progressText}>0%</span>
//             <span className={css.progressText}>50%</span>
//             <span className={css.progressText}>100%</span>
//           </div>
//         </div>
//         <button className={css.addWaterButton} onClick={toggleModal}>
//           <CgAdd className={css.icon} /> Add Water
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className={css.modalOverlay}>
//           <div className={css.modalContent}>
//             <AddWaterModal />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaterRatioPanel;



import Loader from '../Loader/Loader.jsx';
import { useDispatch, useSelector } from "react-redux";
import { CgAdd } from 'react-icons/cg';

import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx'

import css from './WaterRatioPanel.module.css';


import { selectLoading, selectWatersToday } from "../../redux/water/selectors.js";


const WaterRatioPanel = ({handleAddWater}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const updateWaterData = (amount, date) => {
  //   console.log(`Amount: ${amount}, Date: ${date}`);
  //   setIsModalOpen(false);
  // };

  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const water = useSelector(selectWatersToday);


  const progress = water?.percentage || "0%";

  console.log(progress);

  const progressPercentage =
    parseFloat(progress) > 100 ? 100 : parseFloat(progress);

  return (

    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.progressBarContainer}>
        {loading ? (
          <Loader />
        ) : (
          <div className={css.progressBar}>
            {/* <div className={css.progress} style={{ width: `${progress}%` }} />
            <div
              className={css.thumb}
              style={{ left: `calc(${progress}% - 7px)` }}
            /> */}

            <div
              className={css.progress}
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
            <div
              className={css.thumb}
              style={{
                left: `calc(${progressPercentage}% - ${(progressPercentage * 14) / 100
                  }px)`,
              }}
            ></div>
            <div className={css.progressTextNumber}>
              <span
                className={`${css.progressText} ${progressPercentage <= 0 ? css.mark : ""
                  }`}
              >
                0%
              </span>
              <span
                className={`${css.progressText} ${progressPercentage === 50 ? css.mark : ""
                  }`}
              >
                50%
              </span>
              <span
                className={`${css.progressText} ${progressPercentage >= 100 ? css.mark : ""
                  }`}
              >
                100%
              </span>
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        className={css.addWaterButton}
        onClick={() => dispatch(toggleModal())}
      >
        <CgAdd className={css.icon} />
        Add Water
      </button>

        

      {isModalOpen && (
        <AddWaterModal
          initialAmount={0}
          onClose={toggleModal}
          updateWaterData={handleAddWater} // Додаємо нову воду
        />
      )}
    </div>
  );
};

export default WaterRatioPanel;