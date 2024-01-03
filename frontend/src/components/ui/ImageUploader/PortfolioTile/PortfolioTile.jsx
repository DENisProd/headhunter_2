import React from "react";
import styles from '../image-uploader.module.scss';
import fileIcon from '../../../../assets/document_icon.svg'; // import your file icon here

export const PortfolioTile = ({image, index, removeImage, uploadProgress}) => {
    // console.log(uploadProgress)
    // console.log(image)
    return (
        <div key={index} className={styles.tile}>
            {image?.mimeType && image?.mimeType.includes('image') ?
                <img src={image.url} alt={`Preview ${index}`}/>
            :
                <img src={fileIcon} alt="File Icon" />
            }
            <button onClick={() => removeImage(index)} className={styles.delete_button}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="vuesax/bold/trash">
                        <g id="trash">
                            <path id="Vector" d="M21.07 5.23C19.46 5.07 17.85 4.95 16.23 4.86V4.85L16.01 3.55C15.86 2.63 15.64 1.25 13.3 1.25H10.68C8.35004 1.25 8.13003 2.57 7.97004 3.54L7.76004 4.82C6.83004 4.88 5.90004 4.94 4.97004 5.03L2.93004 5.23C2.51004 5.27 2.21004 5.64 2.25004 6.05C2.29004 6.46 2.65004 6.76 3.07004 6.72L5.11004 6.52C10.35 6 15.63 6.2 20.93 6.73C20.96 6.73 20.98 6.73 21.01 6.73C21.39 6.73 21.72 6.44 21.76 6.05C21.79 5.64 21.49 5.27 21.07 5.23Z" fill="#292D32"/>
                            <path id="Vector_2" d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14ZM13.66 17.75H10.33C9.91999 17.75 9.57999 17.41 9.57999 17C9.57999 16.59 9.91999 16.25 10.33 16.25H13.66C14.07 16.25 14.41 16.59 14.41 17C14.41 17.41 14.07 17.75 13.66 17.75ZM14.5 13.75H9.49999C9.08999 13.75 8.74999 13.41 8.74999 13C8.74999 12.59 9.08999 12.25 9.49999 12.25H14.5C14.91 12.25 15.25 12.59 15.25 13C15.25 13.41 14.91 13.75 14.5 13.75Z" fill="#292D32"/>
                        </g>
                    </g>
                </svg>
            </button>
            <p>{uploadProgress} / 100%</p>
        </div>
    );
};
