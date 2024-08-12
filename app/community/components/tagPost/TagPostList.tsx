'use client';

import React, { useEffect } from 'react';
import Loading from '@/app/loading';
import axiosInstance from '@/app/utils/axiosInstance';
import useDebounce from '@/app/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import EmptyTagPostListItem from './EmptyTagPostListItem';
import TagPostListItem from './TagPostListItem';
import { PostInfo } from '@/app/types/post';
import { communityPostInfos } from '@/app/data/mock/communityPostInfos';

interface TagPostListProps {
  searchQuery: string;
}

// 시험 목록 반환 API (10개 게시글 단위로)
// const fetchExams = async ({ queryKey }: any) => {
//   const page = queryKey[1];
//   const searchQuery = queryKey[2];
//   const response = await axiosInstance.get(
//     `${process.env.NEXT_PUBLIC_API_VERSION}/assignment/?page=${page}&limit=10&sort=-createdAt&q=title,course,writer=${searchQuery}`
//   );
//   return response.data;
// };

export default function TagPostList({ searchQuery }: TagPostListProps) {
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const params = useSearchParams();

  const page = Number(params?.get('page')) || 1;

  // const { isPending, data } = useQuery({
  //   queryKey: ['examList', page, debouncedSearchQuery],
  //   queryFn: fetchExams,
  // });

  const router = useRouter();

  // const resData = data?.data;
  const resData = communityPostInfos;

  // if (isPending) return <Loading />;

  return (
    <div className='mt-3 flex flex-col gap-y-3'>
      {resData?.length === 0 && <EmptyTagPostListItem />}
      {resData?.map((hotPostInfo: PostInfo, index: number) => (
        <TagPostListItem
          postInfo={hotPostInfo}
          key={index}
          index={index}
          length={resData.length}
        />
      ))}
    </div>
  );
}
