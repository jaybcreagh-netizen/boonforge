interface Props {
  id: string
  alt?: string
  className?: string
}

export default function Icon({ id, alt = '', className = 'h-6 w-6' }: Props) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}icons/${id}.webp`}
      alt={alt}
      loading="lazy"
      className={`shrink-0 object-contain ${className}`}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}
