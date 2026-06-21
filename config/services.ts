import { IconType } from 'react-icons'
import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
} from 'react-icons/si'

export type Service = {
  // i18n key under services.items.* in common.json; resolves to title + description.
  key: string
  icon: IconType
}

// What I offer as a freelancer. The copy lives in public/locales/*/common.json
// under `services.items.<key>`; this just pairs each entry with its icon/order.
export const Services: Service[] = [
  { key: 'web_apps', icon: SiReact },
  { key: 'frontend', icon: SiNextdotjs },
  { key: 'backend', icon: SiNodedotjs },
  { key: 'databases', icon: SiPostgresql },
]
