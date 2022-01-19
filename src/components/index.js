import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Slider from "react-slick";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { likeImage } from '../state/action-creators';
import fallback from './fallback.jpeg';

function ImageSlider(props) {
    const dispatch = useDispatch();
    const [images, setImages] = useState(false);
    const [copied, setCopied] = useState(false);
    function copy(url) {
        const el = document.createElement("input");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }
    const photos = useSelector((state) => state.starzoid.allPhotos);
    const data = photos
    useEffect(() => {
        if (data && data.length > 0) {
            console.log(data)
            setImages(data);
        } else {
            setImages([]);
        }

    }, [data])
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: props.slidesToShow,
        slidesToScroll: 1,
        cssEase: "linear"
    }
    return (
        images.length > 0 ? <Slider {...settings}>
             {images && images.map((image, index) => {
                return (<div className="card-wrapper" key={index}>
                    <div className="card">
                        <div className="card-image">
                            <img src={image.img_src || fallback} alt='N/A' />
                        </div>
                        <ul className="social-icons">
                            <li>
                                <a>
                                    <IconButton onClick={() => {
                                        copy(image.img_src)
                                    }}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <IconButton onClick={() => {
                                        let latest = [...data];
                                        if (latest[index].liked) {
                                            latest[index].liked = false;
                                        } else {
                                            latest[index].liked = true;
                                        }
                                        dispatch(likeImage(latest));
                                    }}>
                                        <FavoriteIcon style={{color: image.liked ? 'red' : 'initial'}} />
                                    </IconButton>
                                </a>
                            </li>
                            <li>
                                <a href={image.img_src} target='_blank' rel="noreferrer">
                                    <IconButton>
                                        <VisibilityIcon />
                                    </IconButton>
                                </a>
                            </li>
                        </ul>
                        <div className="details">
                            <p>Details:</p>
                             <p style={{color:'black',margin:'5%'}} className="job-title">Image taken from {image.camera.name} which stands for {image.camera.full_name}. The recorded earth date of the image is {image.earth_date}.</p>
                        </div>
                    </div> 
            </div>)})}
        </Slider> : 
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton>
                <PendingTwoToneIcon style={{color: 'red'}} />
            </IconButton>
            <h1 style={{color: '#fff'}}>Loading...</h1>
        </div>
    )
}
ImageSlider.propTypes = {
    slidesToShow: PropTypes.number,
};
export default ImageSlider;