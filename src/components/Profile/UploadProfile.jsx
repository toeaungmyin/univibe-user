import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	IconButton,
	Spinner,
	Typography,
} from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import {
	CameraIcon,
	ChevronLeftIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import imageCompression from 'browser-image-compression';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRequest } from '../../service/User';
import { getAuthUser } from '../../features/auth/AuthSlice';
import { ThemeContext } from '../../ThemeContext/ThemeContext';

const UploadProfile = () => {
	const { theme } = useContext(ThemeContext);
	const authUser = useSelector(state => state.authReducer.user);
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [compressedImageURL, setCompressedImageURL] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [isUploading, setUploading] = useState(false);
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
			setUploading(true);
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
		} finally {
			setUploading(false);
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
				size={expand ? 'xxl' : 'xs'}
				className={`${expand ? 'w-full h-screen' : 'w-full h-[33rem]'}
				${theme !== 'dark' ? 'bg-white' : 'bg-gray-900'}`}>
				<DialogHeader className='justify-between'>
					<div className='flex gap-2'>
						{expand && (
							<IconButton
								color='blue-gray'
								size='sm'
								variant='text'
								onClick={handleOpen}>
								<ChevronLeftIcon className='w-5 h-5' />
							</IconButton>
						)}
						<Typography
							variant='h5'
							color={theme !== 'dark' ? 'blue-gray' : 'white'}>
							Profile Preview
						</Typography>
					</div>
					{!expand && (
						<IconButton
							color='blue-gray'
							size='sm'
							variant='text'
							onClick={handleOpen}>
							<XMarkIcon className='w-5 h-5' />
						</IconButton>
					)}
				</DialogHeader>
				<DialogBody
					className={`w-full h-full max-w-md max-h-96 m-0 mx-auto p-0 `}>
					{isLoading ? (
						<div className='w-full h-full flex justify-center items-center'>
							<Spinner
								className='w-10 h-10'
								color='cyan'
							/>
						</div>
					) : (
						<div className='relative w-full h-full flex justify-center items-center'>
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
						</div>
					)}
				</DialogBody>
				<DialogFooter>
					<Button
						fullWidth
						variant='filled'
						color='cyan'
						className='flex gap-2 justify-center items-center'
						onClick={UploadProfileImage}>
						{isUploading ? (
							<Spinner
								className='h-5 w-5 me-3'
								color='white'
							/>
						) : (
							''
						)}
						<span>Upload</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default UploadProfile;
