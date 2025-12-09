import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./features/loan-application/components/DashboardOverview";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardOverview />} />
        </Routes>
    );
};

export default Router;
