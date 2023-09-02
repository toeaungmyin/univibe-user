import React, { useContext, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Spinner } from '@material-tailwind/react';
import { TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { ThemeContext } from '../../../../ThemeContext/ThemeContext';
import { ErrorImage } from '../../../../assets/images';

export const PhotoUpdate = ({
	post,
	setImage,
	isRemoveImage,
	setRemoveImage,
}) => {
	const [compressedImageURL, setCompressedImageURL] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const { theme } = useContext(ThemeContext);

	const handleImageCompress = async image => {
		const imageFile = image[0];
		setRemoveImage(false);
		if (imageFile) {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
			};
			try {
				setLoading(true);
				const compressedFile = await imageCompression(
					imageFile,
					options
				);

				setImage(compressedFile);
				setCompressedImageURL(URL.createObjectURL(compressedFile));
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		} else {
			// If the user removed the uploaded file or no file is selected, set the image state to null.
			setImage(null);
			setCompressedImageURL(null);
		}
	};

	return (
		<div
			className={`relative min-h-[24rem] border-2 pt-6 border-cyan-400 border-dashed rounded-lg ${
				(post?.image || compressedImageURL) && 'min-h-[12rem]'
			}  ${
				theme !== 'dark'
					? 'bg-blue-gray-50 '
					: 'bg-blue-gray-900 [&_*]:bg-blue-gray-900 [&_*]:text-blue-gray-50'
			}`}>
			<div className='absolute top-0 right-0 p-1 flex gap-1'>
				<PhotoIcon className='w-8 h-8 text-white bg-cyan-500 p-1 rounded' />
				{!isRemoveImage && (
					<TrashIcon
						onClick={() => setRemoveImage(true)}
						className='w-8 h-8 text-white bg-red-500 p-1 rounded cursor-pointer !z-50'
					/>
				)}
			</div>
			<input
				type='file'
				className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer !z-40'
				onChange={e => handleImageCompress(e.target.files)}
				accept='image/*'
			/>

			<div className='absolute top-0 left-0 w-full h-full flex justify-center  items-center overflow-hidden'>
				{(isRemoveImage || compressedImageURL || post?.image) && (
					<div className=' w-full h-full flex justify-center items-center'>
						{isLoading ? (
							<Spinner
								color='cyan'
								className='w-10 h-10'
							/>
						) : (
							!isRemoveImage && (
								<img
									src={
										compressedImageURL ||
										post?.image ||
										ErrorImage
									}
									onError={e => (e.target.src = ErrorImage)}
									alt='OldImage'
									className='w-full h-full object-contain object-center'
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	);
};
