

export interface IAppearanceProps {
    theme: 'auto' | 'light' | 'dark', // auto, light, dark
    coverPhoto: '', // 封面图片



}



function createAppearance(params?: IAppearanceProps) {
    return {
        theme: params?.theme || 'auto',
        coverPhoto: params?.coverPhoto || '',
    }
}