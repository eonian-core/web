interface Props {
  justify: 'start' | 'end' | 'center' | 'between' | 'around'
}

export const Row: React.FC<React.PropsWithChildren<Props>> = ({ children, justify }) => {
  return <div className={`flex justify-${justify}`}>{children}</div>
}
