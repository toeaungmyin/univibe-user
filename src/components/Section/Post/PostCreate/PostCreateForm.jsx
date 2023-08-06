import React, { useState } from 'react';
import {
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Textarea,
	IconButton,
	Select,
	Option,
	Spinner,
} from '@material-tailwind/react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { PhotoUpload } from './PhotoUpload';
import { useForm } from 'react-hook-form';
import { createPostRequest } from '../../../../server/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../../features/auth/PostSlice';

export function PostCreateForm({ open, handleOpen }) {
	const [photoUpload, setPhotoUpload] = useState(false);
	const [image, setImage] = useState(null);
	const handlePhotoUpload = () => setPhotoUpload(cur => !cur);
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.postReducer.posts);

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm({
		defaultValues: {
			audience: 'public',
			content: '',
			image: '',
		},
	});

	const createPost = async ({ content, audience }) => {
		setLoading(true);
		console.log(image);
		try {
			const res = await createPostRequest({
				content,
				audience,
				image,
			});
			console.log(res);
			if (res?.status === 200) {
				dispatch(getPosts([res.data.post, ...posts]));
				// reset();
			}
		} catch (error) {
			console.error('Error:', error);
			if (error?.status === 422) {
				const errors = error.data.errors;
				if (errors && errors.content) {
					setError('content', {
						type: 'server',
						message: errors.content,
					});
				} else if (errors && errors.image) {
					setError('image', {
						type: 'server',
						message: errors.image,
					});
				} else if (error.data.message) {
					setError('root', {
						type: 'server',
						message: error.data.message,
					});
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Dialog
				size="md"
				open={open}
				handler={handleOpen}
				className="bg-transparent shadow-none"
			>
				<form onSubmit={handleSubmit(createPost)}>
					<Card className="mx-auto w-full p-0 overflow-hidden">
						<CardHeader
							variant="filled"
							color="transparent"
							shadow={false}
							floated={false}
							className="m-0 p-4 rounded-none grid place-items-center border-b border-blue-gray-300"
						>
							<div className="w-full flex justify-between items-center">
								<Typography
									variant="h5"
									className="text-blue-gray-800"
								>
									Create New Post
								</Typography>
								<IconButton
									onClick={handleOpen}
									variant="text"
									className="rounded"
									color="blue-gray"
								>
									<XMarkIcon className="w-6 x-6" />
								</IconButton>
							</div>
						</CardHeader>
						<CardBody className="max-h-[30rem] min-h-[10rem] flex flex-col gap-4 p-2 px-4 overflow-auto">
							{errors.content && (
								<Typography
									className="ms-1 text-xs font-medium"
									color="red"
									variant="small"
								>
									{errors.content.message}
								</Typography>
							)}
							<Textarea
								rows={5}
								placeholder="What about today?"
								className=" !border-0 focus:border-transparent mt-1"
								containerProps={{
									className: 'grid h-full',
								}}
								labelProps={{
									className: 'before:content-none after:content-none',
								}}
								{...register('content', {
									required: 'Content Field is required',
								})}
								error={errors.content ? true : false}
							/>

							{/* {photoUpload && (
								<div className="px-2">
									<PhotoUpload setImage={setImage} />
								</div>
							)} */}
						</CardBody>
						<CardFooter className="pt-2 flex flex-col gap-2">
							<div className="flex justify-between items-center">
								<div className="w-40">
									<Select
										label="Post Audience"
										size="md"
										color="cyan"
									>
										<Option>Public</Option>
										<Option>private</Option>
										<Option>friends</Option>
									</Select>
								</div>
								<IconButton
									variant="text"
									color="cyan"
									className="p-0"
									onClick={handlePhotoUpload}
								>
									<PhotoIcon className="w-8 h-8" />
								</IconButton>
							</div>
							<Button
								variant="filled"
								fullWidth
								color="cyan"
								type="submit"
								className="flex justify-center items-center shadow-none hover:shadow-none focus:shadow-none"
							>
								{isLoading ? (
									<Spinner
										className="h-4 w-4 me-3"
										color="white"
									/>
								) : (
									''
								)}
								Create
							</Button>
						</CardFooter>
					</Card>
				</form>
			</Dialog>
		</>
	);
}
