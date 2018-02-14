import {NativeModules} from 'react-native';
const NativeGalleryModule = NativeModules.NativeGalleryModule;
import _ from 'lodash';

async function getAlbumsWithThumbnails() {
  const albums = await NativeGalleryModule.getAlbumsWithThumbnails();
  return albums;
}

async function getImageUriForId(imageId) {
  // Return what getImagesForIds() typically returns in the 'uri' field.
  return `file://${imageId}`;
}

async function getImagesForIds(imagesUris = []) {
  return await NativeGalleryModule.getImagesForUris(imagesUris);
}

async function getImageForTapEvent(nativeEvent) {
  const selectedImageId = nativeEvent.selected;
  const imageUri = selectedImageId && await getImageUriForId(selectedImageId);
  return {selectedImageId, imageUri, width: nativeEvent.width, height: nativeEvent.height};
}

async function getImagesForCameraEvent(event) {
  if (!event.captureImages) {
    return [];
  }
  
  const images = [];
  event.captureImages.forEach(async (image) => {
    images.push({
      ...image,
      uri: await getImageUriForId(image.uri)
    });
  });
  return images;
}
async function resizeImage(image = {}, quality = 'original') {
  console.log('Warning - CameraKitGallery.resizeImage isn\'t  support on Android yet');
  return;
}

async function checkDevicePhotosAuthorizationStatus() {
  const isAuthorized = await NativeGalleryModule.checkDeviceStorageAuthorizationStatus();
  return isAuthorized;
}

async function requestDevicePhotosAuthorization() {
  const isAuthorized = await NativeGalleryModule.requestDeviceStorageAuthorization();
  return isAuthorized;
}

async function resizeImage(image = {}, quality = 'original') {
    if (quality === 'original') {
        return images;
    }
    const ans = await NativeGalleryModule.resizeImage(image, quality);
    return ans;
}


export default {
  checkDevicePhotosAuthorizationStatus,
  requestDevicePhotosAuthorization,
  getAlbumsWithThumbnails,
  getImageUriForId,
  getImagesForIds,
  getImageForTapEvent,
  getImagesForCameraEvent,
  resizeImage
}
