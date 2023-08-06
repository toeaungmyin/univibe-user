import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import imageCompression from 'browser-image-compression';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const PhotoUpload = ({ setImage }) => {
	const handleImageUpload = async image => {
		if (image && image.length > 0) {
			const imageFile = image[0];

			if (imageFile.file) {
				const options = {
					maxSizeMB: 1,
					maxWidthOrHeight: 1920,
				};
				try {
					const compressedFile = await imageCompression(
						imageFile.file,
						options
					);
					console.log(compressedFile);
					setImage(compressedFile);
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			// If the user removed the uploaded file or no file is selected, set the image state to null.
			setImage(null);
		}
	};

	return (
		<div className="bg-blue-gray-50 border-2 pt-6 p-4 border-cyan-400 border-dashed rounded-lg">
			<FilePond
				onupdatefiles={handleImageUpload}
				allowImageCompression
				allowMultiple={false}
				imageCompressionMaxSize={1024} // Set the maximum file size (in KB) for compression
				onremovefile={() => setImage(null)}
			/>
		</div>
	);
};
