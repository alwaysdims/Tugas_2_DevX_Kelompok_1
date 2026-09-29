export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {darkMode ? '☼' : '◐'}
      </span>
    </button>
  )
}
