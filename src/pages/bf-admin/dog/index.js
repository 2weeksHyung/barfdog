import s from './dog.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import MetaTitle from '/src/components/atoms/MetaTitle';
import AdminLayout from '/src/components/admin/AdminLayout';
import { AdminContentWrapper } from '/src/components/admin/AdminWrapper';
import AmdinErrorMessage from '/src/components/atoms/AmdinErrorMessage';
import SearchBar from '/src/components/admin/form/searchBar';
import SearchTextWithCategory from '/src/components/admin/form/searchBar/SearchTextWithCategory';
import DogList from './DogList';
import PaginationWithAPI from '/src/components/atoms/PaginationWithAPI';
import Spinner from '/src/components/atoms/Spinner';
import enterKey from '/util/func/enterKey';
import { getDefaultPagenationInfo } from '/util/func/getDefaultPagenationInfo';
import { MirrorTextOnHoverEvent } from '/util/func/MirrorTextOnHoverEvent';

const initialSearchValues = {
  memberName: '',
  memberEmail: '',
  dogName: '',
};

function ManageDogPage() {
  const getListApiUrl = '/api/admin/search/dogs';
  const searchPageSize = 10;
  const apiDataQueryString = 'queryDogWithMemberAndSubscribeDtoList';

  const [isLoading, setIsLoading] = useState({});
  const [itemList, setItemList] = useState([]);
  const [searchValue, setSearchValue] = useState(initialSearchValues);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryInitialize, setSearchQueryInitialize] = useState(false);

  useEffect(() => {
    MirrorTextOnHoverEvent(window);
  }, [itemList]);

  const pageInterceptor = useCallback((res, option = { itemQuery: null }) => {
    return getDefaultPagenationInfo(res?.data, apiDataQueryString, {
      pageSize: searchPageSize,
      setInitialize: setSearchQueryInitialize,
    });
  }, []);

  const onResetSearchValues = () => {
    setSearchValue(initialSearchValues);
  };

  const onSearchHandler = () => {
    const queryArr = [];
    for (const key in searchValue) {
      const val = searchValue[key];
      queryArr.push(`${key}=${val}`);
    }
    const query = `${queryArr.join('&')}`;
    setSearchQuery(query);
  };

  const onSearchInputKeydown = (e) => {
    enterKey(e, onSearchHandler);
  };

  return (
    <>
      <MetaTitle title="반려견 관리" admin={true} />
      <AdminLayout>
        <AdminContentWrapper>
          <h1 className="title_main">반려견 관리</h1>
          <section className="cont">
            <SearchBar onReset={onResetSearchValues} onSearch={onSearchHandler}>
              <SearchTextWithCategory
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                title="반려견검색"
                name="keyword"
                id="keyword"
                events={{ onKeydown: onSearchInputKeydown }}
                options={[
                  { label: '반려견명', value: 'dogName' },
                  { label: '견주 이름', value: 'memberName' },
                  { label: '견주 ID', value: 'memberEmail' },
                ]}
              />
            </SearchBar>
          </section>
          <section className="cont">
            <div className="cont_header clearfix">
              <p className="cont_title cont-left">반려견목록</p>
            </div>
            <div className={`${s.cont_viewer} ${s.fullWidth}`}>
              <div className={s.table}>
                <ul className={s.table_header}>
                  <li className={s.table_th}>상세보기</li>
                  <li className={s.table_th}>견주 이름</li>
                  <li className={s.table_th}>견주 ID</li>
                  <li className={s.table_th}>반려견명</li>
                  <li className={s.table_th}>품종</li>
                  <li className={s.table_th}>성별</li>
                  <li className={s.table_th}>생년월일</li>
                  <li className={s.table_th}>사이즈</li>
                  <li className={s.table_th}>몸무게</li>
                  <li className={s.table_th}>상태</li>
                  <li className={s.table_th}>중성화</li>
                  <li className={s.table_th}>대표견 여부</li>
                </ul>
                {itemList.length ? (
                  <DogList items={itemList} />
                ) : isLoading.fetching ? (
                  <AmdinErrorMessage loading={<Spinner />} />
                ) : (
                  <AmdinErrorMessage text="조회된 데이터가 없습니다." />
                )}
              </div>
            </div>
            <div className={s['pagination-section']}>
              <PaginationWithAPI
                apiURL={getListApiUrl}
                size={searchPageSize}
                setItemList={setItemList}
                urlQuery={searchQuery}
                setIsLoading={setIsLoading}
                pageInterceptor={pageInterceptor}
                option={{ apiMethod: 'GET', initialize: searchQueryInitialize }}
                queryItemList={apiDataQueryString}
              />
            </div>
          </section>
        </AdminContentWrapper>
      </AdminLayout>
    </>
  );
}

export default ManageDogPage;