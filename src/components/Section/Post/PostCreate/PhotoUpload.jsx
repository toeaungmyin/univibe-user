import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import imageCompression from 'browser-image-compression';
import { Spinner } from '@material-tailwind/react';

registerPlugin(FilePondPluginImageExifOrientation);

export const PhotoUpload = ({ image, setImage }) => {
	const [compressedImageURL, setCompressedImageURL] = useState(null);
	const [isLoading, setLoading] = useState(false);

	const handleImageUpload = async image => {
		if (image && image.length > 0) {
			const imageFile = image[0];

			if (imageFile.file) {
				const options = {
					maxSizeMB: 1,
					maxWidthOrHeight: 1920,
				};
				try {
					setLoading(true);
					const compressedFile = await imageCompression(
						imageFile.file,
						options
					);

					setImage(compressedFile);
					setCompressedImageURL(URL.createObjectURL(compressedFile));
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			}
		} else {
			// If the user removed the uploaded file or no file is selected, set the image state to null.
			setImage(null);
			setCompressedImageURL(null);
		}
	};

	return (
		<div className="bg-blue-gray-50 border-2 pt-6 p-4 border-cyan-400 border-dashed rounded-lg">
			<FilePond
				onupdatefiles={handleImageUpload}
				allowImageCompression
				allowMultiple={false}
				allowProcess={true}
				imageCompressionMaxSize={1024} // Set the maximum file size (in KB) for compression
				onremovefile={() => {
					setImage(null);
					setCompressedImageURL(null);
				}}
			/>
			<div className="px-4 flex justify-center items-center">
				{isLoading ? (
					<Spinner
						className="h-16 w-16"
						color="cyan"
					/>
				) : (
					compressedImageURL && (
						<img
							src={compressedImageURL}
							alt="Compressed"
							style={{ maxWidth: '100%' }}
						/>
					)
				)}
			</div>
		</div>
	);
};
