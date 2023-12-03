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
                {/* Your delete button SVG */}
            </button>
            <p>{uploadProgress} / 100%</p>
        </div>
    );
};
