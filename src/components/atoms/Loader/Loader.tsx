import ContentLoader, { type IContentLoaderProps } from "react-content-loader"

const Loader = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={200}
    height={160}
    viewBox="0 0 200 160"
    backgroundColor="#2C2B2C"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="15" y="15" rx="23" ry="23" width="159" height="110" />
  </ContentLoader>
)

export default Loader