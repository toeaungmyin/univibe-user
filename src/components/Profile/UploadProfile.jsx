import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	IconButton,
	Spinner,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import imageCompression from 'browser-image-compression';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRequest } from '../../service/User';
import { getAuthUser } from '../../features/auth/AuthSlice';

const UploadProfile = () => {
	const authUser = useSelector(state => state.authReducer.user);
	const dispatch = useDispatch();

	const [image, setImage] = useState(null);
	const [compressedImageURL, setCompressedImageURL] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	//crop Profile
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const handleOpen = () => setOpen(!open);

	const handleImageCompress = async image => {
		if (image && image.length === 1) {
			const imageFile = image[0];

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
					// setImage(compressedFile);
					setCompressedImageURL(URL.createObjectURL(compressedFile));
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
					imageFile.value = '';
				}
			}
		} else {
			console.log('Error');
			// If the user removed the uploaded file or no file is selected, set the image state to null.
			setCompressedImageURL(null);
		}
	};

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		const canvas = document.createElement('canvas');
		const image = new Image();
		image.src = compressedImageURL; // Replace 'yourImageSource' with the image source URL or data URI
		// Wait for the image to load
		image.onload = () => {
			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;

			canvas.width = croppedAreaPixels.width;
			canvas.height = croppedAreaPixels.height;
			const ctx = canvas.getContext('2d');

			ctx.drawImage(
				image,
				croppedAreaPixels.x * scaleX,
				croppedAreaPixels.y * scaleY,
				croppedAreaPixels.width * scaleX,
				croppedAreaPixels.height * scaleY,
				0,
				0,
				croppedAreaPixels.width,
				croppedAreaPixels.height
			);

			// Set the cropped image data URL in state\
			canvas.toBlob(blob => {
				setImage(blob);
			}, 'image/jpeg');
		};
	};
	const [expand, setExpand] = useState(false);

	useEffect(() => {
		// Define a media query for screens with a max width of 960px
		const mediaQuery = window.matchMedia('(max-width: 960px)');

		// Initial check and set state based on the media query
		setExpand(mediaQuery.matches);

		// Add a listener for changes to the media query
		const mediaQueryListener = event => {
			setExpand(event.matches);
		};

		// Add the listener to the media query
		mediaQuery.addListener(mediaQueryListener);

		// Clean up the listener when the component unmounts
		return () => {
			mediaQuery.removeListener(mediaQueryListener);
		};
	}, []);

	const UploadProfileImage = async () => {
		try {
			let formData = new FormData();
			const filename =
				authUser.username.replace(/ /g, '').toLowerCase() +
				'.' +
				image.type.split('/')[1];
			formData.append('profile_url', image, image.name);
			console.log(...formData);
			const response = await updateUserRequest(authUser.id, formData);
			console.log(response);
			dispatch(getAuthUser(response.data));
			setOpen(false);
			setImage(null);
		} catch (error) {
			if (error.status === 422) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<IconButton
				variant='filled'
				color='gray'
				className='!absolute bottom-0 left-5 rounded-full border-2 !opacity-100'>
				<CameraIcon className='w-6 h-6' />
				<input
					type='file'
					className='!absolute top-1/2 left-1/2 -translate-y-1/2 w-8 h-8 -translate-x-1/2 rounded-full border-2 !opacity-0'
					onChange={e => {
						setOpen(true);
						handleImageCompress(e.target.files);
					}}
					accept='image/*'
					onClick={() => setOpen(true)}
				/>
			</IconButton>
			<Dialog
				open={open}
				handler={handleOpen}
				size={expand ? 'xxl' : 'xs'}>
				<DialogHeader>Profile Preview</DialogHeader>
				<DialogBody
					className='w-96 h-96 mx-auto'
					divider>
					{isLoading ? (
						<Spinner className='w-10 h-10 text-cyan-500' />
					) : (
						<>
							<div className='crop-container'>
								<Cropper
									image={compressedImageURL}
									crop={crop}
									zoom={zoom}
									aspect={3 / 3}
									onCropComplete={onCropComplete}
									onCropChange={setCrop}
									onZoomChange={setZoom}
									onImageLoaded={res => {
										console.log(res);
									}}
								/>
							</div>
							<div className='controls' />
						</>
					)}
				</DialogBody>
				<DialogFooter>
					<Button
						variant='gradient'
						color='green'
						onClick={UploadProfileImage}>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default UploadProfile;
