import { useThemeToggle } from "../store/themeContext"
import Switch from '@mui/material/Switch';


export function ToggleButton() {

    const { toggleTheme, mode } = useThemeToggle();
  
    const handleChange = () => {
        toggleTheme();
    };
  
    return (
        <div>       
            <Switch checked={mode === 'dark'}  onChange={handleChange}  />
        </div>
    );
}