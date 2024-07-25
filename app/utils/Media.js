"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const MediaImage = ({ mediaId, mediaClass }) => {
  const [media, setMedia] = useState(null);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`https://kornberglawfirm.com/wp-json/wp/v2/media/${mediaId}`, {next:{revalidate:3600 }});        
        const mediaData = response.data;
        setMedia(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    fetchMedia();
  }, [mediaId]);

  return (
    <>
      {media && <Image src={media.guid.rendered} width={media.media_details.width} height={media.media_details.height} alt={media.alt_text} className={mediaClass} />}
    </>
  );
};

export default MediaImage;