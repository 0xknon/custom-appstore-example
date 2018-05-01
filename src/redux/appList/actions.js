
const appListActions = {
	UPDATE_APP_NORMAL_LIST: 'UPDATE_APP_NORMAL_LIST',
	UPDATE_APP_RECOM_LIST: 'UPDATE_APP_RECOM_LIST',
	UPDATE_SEARCHED_APP_LIST: 'UPDATE_SEARCHED_APP_LIST',
  updateNormalList: (normalList) => ({
    type: appListActions.UPDATE_APP_NORMAL_LIST,
    normalList
  }),
  updateRecommendationList: (recommendationList) => ({
    type: appListActions.UPDATE_APP_RECOM_LIST,
    recommendationList
  }),
  updateSearchedList: (searchedList) => ({
    type: appListActions.UPDATE_SEARCHED_APP_LIST,
    searchedList
  }),
};

export default appListActions