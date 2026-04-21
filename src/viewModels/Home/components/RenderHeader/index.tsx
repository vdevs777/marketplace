import { memo } from "react";
import { HomeHeader } from "../Header";
import { SearchInput } from "../SearchInput";

export const RenderHeader = memo(
  ({
    searchText,
    setSearchText,
  }: {
    searchText: string;
    setSearchText: (text: string) => void;
  }) => (
    <>
      <HomeHeader />
      <SearchInput setSearchText={setSearchText} searchText={searchText} />
    </>
  ),
);
