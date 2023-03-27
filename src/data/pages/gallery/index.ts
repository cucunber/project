type GalleryItem = {
    src: string,
    description: string,
}

export interface IGalleryResponse {
    gallery: GalleryItem[]
}

export const galleryRoutes = {
    gallery: '/data/gallery/gallery.json'
}