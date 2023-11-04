import image_1 from "../assets/images/image-1.webp";
import image_2 from "../assets/images/image-2.webp";
import image_3 from "../assets/images/image-3.webp";
import image_4 from "../assets/images/image-4.webp";
import image_5 from "../assets/images/image-5.webp";
import image_6 from "../assets/images/image-6.webp";
import image_7 from "../assets/images/image-7.webp";
import image_8 from "../assets/images/image-8.webp";
import image_9 from "../assets/images/image-9.webp";
import image_10 from "../assets/images/image-10.jpeg";
import image_11 from "../assets/images/image-11.jpeg";
import image_0 from "../assets/images/add-image.png";

const imgObj = {
  image_0,
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  image_6,
  image_7,
  image_8,
  image_9,
  image_10,
  image_11,
};

export const getImage = (id) => {
  return imgObj[`image_${id}`];
};
