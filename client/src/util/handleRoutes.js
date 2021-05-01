export const handleRoutes = (props, suffix) => {
    const JobsPath = '/jobs';
    const DashboardPath = '/dashboard'
    const DatasetPath = '/datasets'
    const viewDatasetPath = '/viewDataset'

    var path;

    if (suffix === 'jobs') {
        path = JobsPath;
    } else if (suffix === 'dashboard') {
        path = DashboardPath;
    } else if (suffix === 'datasets') {
        path = DatasetPath;
    } else if (suffix === 'viewDataset') {
        path = viewDatasetPath;
    }

    props.history.push({
        pathname: path,
    })
}