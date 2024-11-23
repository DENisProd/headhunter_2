import React, { useMemo } from "react";
import Tile from "../../ui/Tile/Tile";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import styles from './portfolio-from-excel.module.scss'
import cn from 'classnames'

import PortfolioImage1 from '../../../assets/portfolio1.jpg'
import PortfolioImage2 from '../../../assets/portfolio2.jpg'
import { Typography } from "../../ui/Typography/Typography";
import { Link } from "react-router-dom";

const baseStyle = {
    borderRadius: '1rem',
    borderColor: 'var(--text-2-color)',
    borderStyle: 'dashed',
    backgroundColor: 'var(--element-bg)',
    color: 'var(--text-2-color)',
    marginBottom: '1rem'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const PortfolioFromExcel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onDrop = async (acceptedFiles) => {
        const updatedImages = [...images]

        console.log(acceptedFiles)
    }


    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: "*", // Принимаем только изображения
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Tile
            props={{
                classNames: styles.image_uploader_container,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div>
                        <Typography>Перейдите в раздел "Портфолио" на <Link to={"https://edu.donstu.ru/WebApp/#/Portfolio/ListWorks"}>ДГТУ.Цифра</Link></Typography>
                    </div>
                    <div className={styles.image_container}>
                        <img src={PortfolioImage1} className={styles.image} />
                    </div>
                    <div>
                        <Typography>Пролистайте страницу в самый низ и нажмите "Экспорт"</Typography>
                    </div>
                    <div className={styles.image_container}>
                        <img src={PortfolioImage2} className={cn(styles.image, styles.small)} />
                    </div>
                    <div>
                        <Typography>Загрузите скаченный файл сюда</Typography>
                    </div>
                </div>
                <div {...getRootProps({ style })} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <p>Перетащите сюда Excel файл с портфолио или нажмите, чтобы выбрать его</p>
                </div>
            </form>
        </Tile>
    );
};

export default PortfolioFromExcel;
