import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./components/DashboardOverview";
import DashboardContainer from "./screens/DashboardContainer";

const Router = () => {
    return (
        <DashboardContainer>
            <Routes>
                <Route path="/" element={<DashboardOverview />} />
            </Routes>
        </DashboardContainer>
    );
};

export default Router;
