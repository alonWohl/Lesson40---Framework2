const { useState } = React

export function LongTxt({ text, limit = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  function onToggleExpansion() {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  const displayText = isExpanded ? text : text.substring(0, limit)
  const isTruncated = text.length > limit

  return (
    <p className='long-text'>
      {displayText}
      {!isExpanded && isTruncated && '...'}
      {isTruncated && <button onClick={onToggleExpansion}>{isExpanded ? 'Less' : 'More'}</button>}
    </p>
  )
}
