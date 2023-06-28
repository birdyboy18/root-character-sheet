import { Link as LocationLink, LinkProps } from '@tanstack/react-location'

export const Link = (props: LinkProps) => {
  return <LocationLink preload={500} {...props} />
}
