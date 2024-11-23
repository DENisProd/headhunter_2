import React, {useEffect, useMemo, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './image-uploader.module.scss'
import {PortfolioTile} from "./PortfolioTile/PortfolioTile";
import {TextField} from "../TextInput/TextField";
import Tile from "../Tile/Tile.jsx";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Button} from "../Button/Button.jsx";
import {useAddPortfolioUserMutation, useRegisterUserMutation} from "../../../store/api/userApi.js";
import { SERVER_URL } from '../../../App.jsx';

// export const BASE_URL = 'https://hh.darksecrets.ru/api/v1/'
// export const BASE_URL = 'http://localhost:5555/v1/'

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

const ImageUploader = ({ setParentImages, closeAdding }) => {
    const [images, setImages] = useState([])
    const [addPortfolioUser, { error }] = useAddPortfolioUserMutation()
    // New state to store upload progress
    const [uploadProgress, setUploadProgress] = useState({})

    const onDrop = async (acceptedFiles) => {
        const updatedImages = [...images]

        for (const file of acceptedFiles) {
            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await axios.post(SERVER_URL + 'file/upload', formData, {
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
                updatedImages.push({ url: SERVER_URL + "uploads/" + response.data?.file?.filename, name: file.name, mimeType: response.data?.file?.mimeType });
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

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: '*', // Принимаем только изображения
    });

    const onSubmit = (data) => {
        if (images.length > 0) {
            const _data = {
                type: 'common',
                name: data.name,
                description: data.description,
                files: images
            }
            addPortfolioUser(_data)
                .then(res => {
                    console.log(res)
                    closeAdding()
                })
                .catch(err => console.log(err))

        }
    }

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

                <div {...getRootProps({style})} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    <p>Перетащите сюда файлы или нажмите, чтобы выбрать файлы</p>
                </div>

                <div className={styles.image_preview}>
                    {images.map((file, index) => (
                        <PortfolioTile image={file} index={index} removeImage={removeImage} uploadProgress={uploadProgress[file.name]}/>
                    ))}
                </div>

                <Button buttonProps={{
                    type: 'submit'
                }}>
                    Добавить портфолио
                </Button>
            </form>
        </Tile>
    );
};

export default ImageUploader;
