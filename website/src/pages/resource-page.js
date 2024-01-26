import PostResource from "../resources/post-resource";
import UnknownResource from "../resources/unknown-resource";

const TYPES = {
  post: PostResource,
};

export default function ResourcePage({ resourceData }) {
  let Type = TYPES[resourceData.type] ?? UnknownResource;
  return <Type resourceData={resourceData} />;
}
