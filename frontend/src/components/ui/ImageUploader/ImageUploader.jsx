import React, {useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './image-uploader.module.scss'
import {PortfolioTile} from "./PortfolioTile/PortfolioTile";
import {TextField} from "../TextInput/TextField";
import Tile from "../Tile/Tile.jsx";
import globalStyles from "../../../styles/global.module.scss";
import cn from 'classnames'
import {FlexLayout} from "../Layout/FlexLayout/FlexLayout";
import {CloseButton} from "../Button/Close/CloseButton";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Button} from "../Button/Button.jsx";
import {useAddPortfolioUserMutation, useRegisterUserMutation} from "../../../store/api/userApi.js";

export const BASE_URL = "http://localhost:8080/v1/"

const ImageUploader = ({ setParentImages }) => {
    const [images, setImages] = useState([]);
    const [addPortfolioUser, { error }] = useAddPortfolioUserMutation()
    // New state to store upload progress
    const [uploadProgress, setUploadProgress] = useState({});

    const onDrop = async (acceptedFiles) => {
        const updatedImages = [...images];

        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8080/v1/file/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress((prevState) => ({ ...prevState, [file.name]: progress }));
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data', // Устанавливаем заголовок multipart/form-data
                    },
                });

                // Assuming response.data contains the URL of the uploaded file
                console.log(response.data)
                updatedImages.push({ url: BASE_URL + "uploads/" + response.data?.file?.filename, name: file.name, mimeType: response.data?.file?.mimeType });
                setImages(updatedImages);
                setUploadProgress(prevState => ({ ...prevState, [file.name]: 100 })); // Set progress to 100% on completion
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        setParentImages && setParentImages(images)

    }, [images])

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '*', // Принимаем только изображения
    });

    const onSubmit = (data) => {
        console.log(data)
        console.log(images)
        if (images.length > 0) {
            const _data = {
                type: 'common',
                name: data.name,
                description: data.description,
                files: images
            }
            console.log(_data)
            addPortfolioUser(_data)
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))

        }
    }

    return (
        <Tile props={{
            classNames: styles.image_uploader_container
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>
                    Название
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Введите название достижения',
                        ...register("name", {required: true})
                    }}
                               message={errors?.email?.type === "required" ? 'Введите название!' : ''}
                    />
                </p>
                <p>
                    Описание
                    <TextField fieldProps={{
                        type: 'text',
                        placeholder: 'Введите название достижения',
                        ...register("description")
                    }}
                    />
                </p>

                <Button buttonProps={{
                    type: 'submit'
                }}>
                    Добавить портфолио
                </Button>
            </form>

            <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Перетащите сюда файлы или нажмите, чтобы выбрать файлы</p>
            </div>
            <div className={styles.image_preview}>
                {images.map((file, index) => (
                    <PortfolioTile image={file} index={index} removeImage={removeImage} uploadProgress={uploadProgress[file.name]}/>
                ))}
            </div>
        </Tile>
    );
};

export default ImageUploader;