import SearchButton from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

const CustomerSearch = () => {
  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Customers..."
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
};
export default CustomerSearch;