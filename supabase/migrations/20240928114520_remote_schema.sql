drop trigger if exists "update_assistant_collections_updated_at" on "public"."assistant_collections";

drop trigger if exists "update_assistant_files_updated_at" on "public"."assistant_files";

drop trigger if exists "update_assistant_tools_updated_at" on "public"."assistant_tools";

drop trigger if exists "update_assistant_workspaces_updated_at" on "public"."assistant_workspaces";

drop trigger if exists "delete_old_assistant_image" on "public"."assistants";

drop trigger if exists "update_assistants_updated_at" on "public"."assistants";

drop trigger if exists "update_chat_files_updated_at" on "public"."chat_files";

drop trigger if exists "update_chats_updated_at" on "public"."chats";

drop trigger if exists "update_collection_files_updated_at" on "public"."collection_files";

drop trigger if exists "update_collection_workspaces_updated_at" on "public"."collection_workspaces";

drop trigger if exists "update_collections_updated_at" on "public"."collections";

drop trigger if exists "update_profiles_updated_at" on "public"."file_items";

drop trigger if exists "update_file_workspaces_updated_at" on "public"."file_workspaces";

drop trigger if exists "delete_old_file" on "public"."files";

drop trigger if exists "update_files_updated_at" on "public"."files";

drop trigger if exists "update_folders_updated_at" on "public"."folders";

drop trigger if exists "update_message_file_items_updated_at" on "public"."message_file_items";

drop trigger if exists "delete_old_message_images" on "public"."messages";

drop trigger if exists "update_messages_updated_at" on "public"."messages";

drop trigger if exists "update_model_workspaces_updated_at" on "public"."model_workspaces";

drop trigger if exists "update_models_updated_at" on "public"."models";

drop trigger if exists "update_preset_workspaces_updated_at" on "public"."preset_workspaces";

drop trigger if exists "update_presets_updated_at" on "public"."presets";

drop trigger if exists "delete_old_profile_image" on "public"."profiles";

drop trigger if exists "update_profiles_updated_at" on "public"."profiles";

drop trigger if exists "update_prompt_workspaces_updated_at" on "public"."prompt_workspaces";

drop trigger if exists "update_prompts_updated_at" on "public"."prompts";

drop trigger if exists "update_tool_workspaces_updated_at" on "public"."tool_workspaces";

drop trigger if exists "update_tools_updated_at" on "public"."tools";

drop trigger if exists "delete_old_workspace_image" on "public"."workspaces";

drop trigger if exists "prevent_update_of_home_field" on "public"."workspaces";

drop trigger if exists "update_workspaces_updated_at" on "public"."workspaces";

drop policy "Allow full access to own assistant_collections" on "public"."assistant_collections";

drop policy "Allow full access to own assistant_files" on "public"."assistant_files";

drop policy "Allow full access to own assistant_tools" on "public"."assistant_tools";

drop policy "Allow full access to own assistant_workspaces" on "public"."assistant_workspaces";

drop policy "Allow full access to own assistants" on "public"."assistants";

drop policy "Allow view access to non-private assistants" on "public"."assistants";

drop policy "Allow full access to own chat_files" on "public"."chat_files";

drop policy "Allow full access to own chats" on "public"."chats";

drop policy "Allow view access to non-private chats" on "public"."chats";

drop policy "Allow full access to own collection_files" on "public"."collection_files";

drop policy "Allow view access to collection files for non-private collectio" on "public"."collection_files";

drop policy "Allow full access to own collection_workspaces" on "public"."collection_workspaces";

drop policy "Allow full access to own collections" on "public"."collections";

drop policy "Allow view access to non-private collections" on "public"."collections";

drop policy "Allow full access to own file items" on "public"."file_items";

drop policy "Allow view access to non-private file items" on "public"."file_items";

drop policy "Allow full access to own file_workspaces" on "public"."file_workspaces";

drop policy "Allow full access to own files" on "public"."files";

drop policy "Allow view access to files for non-private collections" on "public"."files";

drop policy "Allow view access to non-private files" on "public"."files";

drop policy "Allow full access to own folders" on "public"."folders";

drop policy "Allow full access to own message_file_items" on "public"."message_file_items";

drop policy "Allow full access to own messages" on "public"."messages";

drop policy "Allow view access to messages for non-private chats" on "public"."messages";

drop policy "Allow full access to own model_workspaces" on "public"."model_workspaces";

drop policy "Allow full access to own models" on "public"."models";

drop policy "Allow view access to non-private models" on "public"."models";

drop policy "Allow full access to own preset_workspaces" on "public"."preset_workspaces";

drop policy "Allow full access to own presets" on "public"."presets";

drop policy "Allow view access to non-private presets" on "public"."presets";

drop policy "Allow full access to own profiles" on "public"."profiles";

drop policy "Allow full access to own prompt_workspaces" on "public"."prompt_workspaces";

drop policy "Allow full access to own prompts" on "public"."prompts";

drop policy "Allow view access to non-private prompts" on "public"."prompts";

drop policy "Allow full access to own tool_workspaces" on "public"."tool_workspaces";

drop policy "Allow full access to own tools" on "public"."tools";

drop policy "Allow view access to non-private tools" on "public"."tools";

drop policy "Allow full access to own workspaces" on "public"."workspaces";

drop policy "Allow view access to non-private workspaces" on "public"."workspaces";

revoke delete on table "public"."assistant_collections" from "anon";

revoke insert on table "public"."assistant_collections" from "anon";

revoke references on table "public"."assistant_collections" from "anon";

revoke select on table "public"."assistant_collections" from "anon";

revoke trigger on table "public"."assistant_collections" from "anon";

revoke truncate on table "public"."assistant_collections" from "anon";

revoke update on table "public"."assistant_collections" from "anon";

revoke delete on table "public"."assistant_collections" from "authenticated";

revoke insert on table "public"."assistant_collections" from "authenticated";

revoke references on table "public"."assistant_collections" from "authenticated";

revoke select on table "public"."assistant_collections" from "authenticated";

revoke trigger on table "public"."assistant_collections" from "authenticated";

revoke truncate on table "public"."assistant_collections" from "authenticated";

revoke update on table "public"."assistant_collections" from "authenticated";

revoke delete on table "public"."assistant_collections" from "service_role";

revoke insert on table "public"."assistant_collections" from "service_role";

revoke references on table "public"."assistant_collections" from "service_role";

revoke select on table "public"."assistant_collections" from "service_role";

revoke trigger on table "public"."assistant_collections" from "service_role";

revoke truncate on table "public"."assistant_collections" from "service_role";

revoke update on table "public"."assistant_collections" from "service_role";

revoke delete on table "public"."assistant_files" from "anon";

revoke insert on table "public"."assistant_files" from "anon";

revoke references on table "public"."assistant_files" from "anon";

revoke select on table "public"."assistant_files" from "anon";

revoke trigger on table "public"."assistant_files" from "anon";

revoke truncate on table "public"."assistant_files" from "anon";

revoke update on table "public"."assistant_files" from "anon";

revoke delete on table "public"."assistant_files" from "authenticated";

revoke insert on table "public"."assistant_files" from "authenticated";

revoke references on table "public"."assistant_files" from "authenticated";

revoke select on table "public"."assistant_files" from "authenticated";

revoke trigger on table "public"."assistant_files" from "authenticated";

revoke truncate on table "public"."assistant_files" from "authenticated";

revoke update on table "public"."assistant_files" from "authenticated";

revoke delete on table "public"."assistant_files" from "service_role";

revoke insert on table "public"."assistant_files" from "service_role";

revoke references on table "public"."assistant_files" from "service_role";

revoke select on table "public"."assistant_files" from "service_role";

revoke trigger on table "public"."assistant_files" from "service_role";

revoke truncate on table "public"."assistant_files" from "service_role";

revoke update on table "public"."assistant_files" from "service_role";

revoke delete on table "public"."assistant_tools" from "anon";

revoke insert on table "public"."assistant_tools" from "anon";

revoke references on table "public"."assistant_tools" from "anon";

revoke select on table "public"."assistant_tools" from "anon";

revoke trigger on table "public"."assistant_tools" from "anon";

revoke truncate on table "public"."assistant_tools" from "anon";

revoke update on table "public"."assistant_tools" from "anon";

revoke delete on table "public"."assistant_tools" from "authenticated";

revoke insert on table "public"."assistant_tools" from "authenticated";

revoke references on table "public"."assistant_tools" from "authenticated";

revoke select on table "public"."assistant_tools" from "authenticated";

revoke trigger on table "public"."assistant_tools" from "authenticated";

revoke truncate on table "public"."assistant_tools" from "authenticated";

revoke update on table "public"."assistant_tools" from "authenticated";

revoke delete on table "public"."assistant_tools" from "service_role";

revoke insert on table "public"."assistant_tools" from "service_role";

revoke references on table "public"."assistant_tools" from "service_role";

revoke select on table "public"."assistant_tools" from "service_role";

revoke trigger on table "public"."assistant_tools" from "service_role";

revoke truncate on table "public"."assistant_tools" from "service_role";

revoke update on table "public"."assistant_tools" from "service_role";

revoke delete on table "public"."assistant_workspaces" from "anon";

revoke insert on table "public"."assistant_workspaces" from "anon";

revoke references on table "public"."assistant_workspaces" from "anon";

revoke select on table "public"."assistant_workspaces" from "anon";

revoke trigger on table "public"."assistant_workspaces" from "anon";

revoke truncate on table "public"."assistant_workspaces" from "anon";

revoke update on table "public"."assistant_workspaces" from "anon";

revoke delete on table "public"."assistant_workspaces" from "authenticated";

revoke insert on table "public"."assistant_workspaces" from "authenticated";

revoke references on table "public"."assistant_workspaces" from "authenticated";

revoke select on table "public"."assistant_workspaces" from "authenticated";

revoke trigger on table "public"."assistant_workspaces" from "authenticated";

revoke truncate on table "public"."assistant_workspaces" from "authenticated";

revoke update on table "public"."assistant_workspaces" from "authenticated";

revoke delete on table "public"."assistant_workspaces" from "service_role";

revoke insert on table "public"."assistant_workspaces" from "service_role";

revoke references on table "public"."assistant_workspaces" from "service_role";

revoke select on table "public"."assistant_workspaces" from "service_role";

revoke trigger on table "public"."assistant_workspaces" from "service_role";

revoke truncate on table "public"."assistant_workspaces" from "service_role";

revoke update on table "public"."assistant_workspaces" from "service_role";

revoke delete on table "public"."assistants" from "anon";

revoke insert on table "public"."assistants" from "anon";

revoke references on table "public"."assistants" from "anon";

revoke select on table "public"."assistants" from "anon";

revoke trigger on table "public"."assistants" from "anon";

revoke truncate on table "public"."assistants" from "anon";

revoke update on table "public"."assistants" from "anon";

revoke delete on table "public"."assistants" from "authenticated";

revoke insert on table "public"."assistants" from "authenticated";

revoke references on table "public"."assistants" from "authenticated";

revoke select on table "public"."assistants" from "authenticated";

revoke trigger on table "public"."assistants" from "authenticated";

revoke truncate on table "public"."assistants" from "authenticated";

revoke update on table "public"."assistants" from "authenticated";

revoke delete on table "public"."assistants" from "service_role";

revoke insert on table "public"."assistants" from "service_role";

revoke references on table "public"."assistants" from "service_role";

revoke select on table "public"."assistants" from "service_role";

revoke trigger on table "public"."assistants" from "service_role";

revoke truncate on table "public"."assistants" from "service_role";

revoke update on table "public"."assistants" from "service_role";

revoke delete on table "public"."chat_files" from "anon";

revoke insert on table "public"."chat_files" from "anon";

revoke references on table "public"."chat_files" from "anon";

revoke select on table "public"."chat_files" from "anon";

revoke trigger on table "public"."chat_files" from "anon";

revoke truncate on table "public"."chat_files" from "anon";

revoke update on table "public"."chat_files" from "anon";

revoke delete on table "public"."chat_files" from "authenticated";

revoke insert on table "public"."chat_files" from "authenticated";

revoke references on table "public"."chat_files" from "authenticated";

revoke select on table "public"."chat_files" from "authenticated";

revoke trigger on table "public"."chat_files" from "authenticated";

revoke truncate on table "public"."chat_files" from "authenticated";

revoke update on table "public"."chat_files" from "authenticated";

revoke delete on table "public"."chat_files" from "service_role";

revoke insert on table "public"."chat_files" from "service_role";

revoke references on table "public"."chat_files" from "service_role";

revoke select on table "public"."chat_files" from "service_role";

revoke trigger on table "public"."chat_files" from "service_role";

revoke truncate on table "public"."chat_files" from "service_role";

revoke update on table "public"."chat_files" from "service_role";

revoke delete on table "public"."chats" from "anon";

revoke insert on table "public"."chats" from "anon";

revoke references on table "public"."chats" from "anon";

revoke select on table "public"."chats" from "anon";

revoke trigger on table "public"."chats" from "anon";

revoke truncate on table "public"."chats" from "anon";

revoke update on table "public"."chats" from "anon";

revoke delete on table "public"."chats" from "authenticated";

revoke insert on table "public"."chats" from "authenticated";

revoke references on table "public"."chats" from "authenticated";

revoke select on table "public"."chats" from "authenticated";

revoke trigger on table "public"."chats" from "authenticated";

revoke truncate on table "public"."chats" from "authenticated";

revoke update on table "public"."chats" from "authenticated";

revoke delete on table "public"."chats" from "service_role";

revoke insert on table "public"."chats" from "service_role";

revoke references on table "public"."chats" from "service_role";

revoke select on table "public"."chats" from "service_role";

revoke trigger on table "public"."chats" from "service_role";

revoke truncate on table "public"."chats" from "service_role";

revoke update on table "public"."chats" from "service_role";

revoke delete on table "public"."collection_files" from "anon";

revoke insert on table "public"."collection_files" from "anon";

revoke references on table "public"."collection_files" from "anon";

revoke select on table "public"."collection_files" from "anon";

revoke trigger on table "public"."collection_files" from "anon";

revoke truncate on table "public"."collection_files" from "anon";

revoke update on table "public"."collection_files" from "anon";

revoke delete on table "public"."collection_files" from "authenticated";

revoke insert on table "public"."collection_files" from "authenticated";

revoke references on table "public"."collection_files" from "authenticated";

revoke select on table "public"."collection_files" from "authenticated";

revoke trigger on table "public"."collection_files" from "authenticated";

revoke truncate on table "public"."collection_files" from "authenticated";

revoke update on table "public"."collection_files" from "authenticated";

revoke delete on table "public"."collection_files" from "service_role";

revoke insert on table "public"."collection_files" from "service_role";

revoke references on table "public"."collection_files" from "service_role";

revoke select on table "public"."collection_files" from "service_role";

revoke trigger on table "public"."collection_files" from "service_role";

revoke truncate on table "public"."collection_files" from "service_role";

revoke update on table "public"."collection_files" from "service_role";

revoke delete on table "public"."collection_workspaces" from "anon";

revoke insert on table "public"."collection_workspaces" from "anon";

revoke references on table "public"."collection_workspaces" from "anon";

revoke select on table "public"."collection_workspaces" from "anon";

revoke trigger on table "public"."collection_workspaces" from "anon";

revoke truncate on table "public"."collection_workspaces" from "anon";

revoke update on table "public"."collection_workspaces" from "anon";

revoke delete on table "public"."collection_workspaces" from "authenticated";

revoke insert on table "public"."collection_workspaces" from "authenticated";

revoke references on table "public"."collection_workspaces" from "authenticated";

revoke select on table "public"."collection_workspaces" from "authenticated";

revoke trigger on table "public"."collection_workspaces" from "authenticated";

revoke truncate on table "public"."collection_workspaces" from "authenticated";

revoke update on table "public"."collection_workspaces" from "authenticated";

revoke delete on table "public"."collection_workspaces" from "service_role";

revoke insert on table "public"."collection_workspaces" from "service_role";

revoke references on table "public"."collection_workspaces" from "service_role";

revoke select on table "public"."collection_workspaces" from "service_role";

revoke trigger on table "public"."collection_workspaces" from "service_role";

revoke truncate on table "public"."collection_workspaces" from "service_role";

revoke update on table "public"."collection_workspaces" from "service_role";

revoke delete on table "public"."collections" from "anon";

revoke insert on table "public"."collections" from "anon";

revoke references on table "public"."collections" from "anon";

revoke select on table "public"."collections" from "anon";

revoke trigger on table "public"."collections" from "anon";

revoke truncate on table "public"."collections" from "anon";

revoke update on table "public"."collections" from "anon";

revoke delete on table "public"."collections" from "authenticated";

revoke insert on table "public"."collections" from "authenticated";

revoke references on table "public"."collections" from "authenticated";

revoke select on table "public"."collections" from "authenticated";

revoke trigger on table "public"."collections" from "authenticated";

revoke truncate on table "public"."collections" from "authenticated";

revoke update on table "public"."collections" from "authenticated";

revoke delete on table "public"."collections" from "service_role";

revoke insert on table "public"."collections" from "service_role";

revoke references on table "public"."collections" from "service_role";

revoke select on table "public"."collections" from "service_role";

revoke trigger on table "public"."collections" from "service_role";

revoke truncate on table "public"."collections" from "service_role";

revoke update on table "public"."collections" from "service_role";

revoke delete on table "public"."file_items" from "anon";

revoke insert on table "public"."file_items" from "anon";

revoke references on table "public"."file_items" from "anon";

revoke select on table "public"."file_items" from "anon";

revoke trigger on table "public"."file_items" from "anon";

revoke truncate on table "public"."file_items" from "anon";

revoke update on table "public"."file_items" from "anon";

revoke delete on table "public"."file_items" from "authenticated";

revoke insert on table "public"."file_items" from "authenticated";

revoke references on table "public"."file_items" from "authenticated";

revoke select on table "public"."file_items" from "authenticated";

revoke trigger on table "public"."file_items" from "authenticated";

revoke truncate on table "public"."file_items" from "authenticated";

revoke update on table "public"."file_items" from "authenticated";

revoke delete on table "public"."file_items" from "service_role";

revoke insert on table "public"."file_items" from "service_role";

revoke references on table "public"."file_items" from "service_role";

revoke select on table "public"."file_items" from "service_role";

revoke trigger on table "public"."file_items" from "service_role";

revoke truncate on table "public"."file_items" from "service_role";

revoke update on table "public"."file_items" from "service_role";

revoke delete on table "public"."file_workspaces" from "anon";

revoke insert on table "public"."file_workspaces" from "anon";

revoke references on table "public"."file_workspaces" from "anon";

revoke select on table "public"."file_workspaces" from "anon";

revoke trigger on table "public"."file_workspaces" from "anon";

revoke truncate on table "public"."file_workspaces" from "anon";

revoke update on table "public"."file_workspaces" from "anon";

revoke delete on table "public"."file_workspaces" from "authenticated";

revoke insert on table "public"."file_workspaces" from "authenticated";

revoke references on table "public"."file_workspaces" from "authenticated";

revoke select on table "public"."file_workspaces" from "authenticated";

revoke trigger on table "public"."file_workspaces" from "authenticated";

revoke truncate on table "public"."file_workspaces" from "authenticated";

revoke update on table "public"."file_workspaces" from "authenticated";

revoke delete on table "public"."file_workspaces" from "service_role";

revoke insert on table "public"."file_workspaces" from "service_role";

revoke references on table "public"."file_workspaces" from "service_role";

revoke select on table "public"."file_workspaces" from "service_role";

revoke trigger on table "public"."file_workspaces" from "service_role";

revoke truncate on table "public"."file_workspaces" from "service_role";

revoke update on table "public"."file_workspaces" from "service_role";

revoke delete on table "public"."files" from "anon";

revoke insert on table "public"."files" from "anon";

revoke references on table "public"."files" from "anon";

revoke select on table "public"."files" from "anon";

revoke trigger on table "public"."files" from "anon";

revoke truncate on table "public"."files" from "anon";

revoke update on table "public"."files" from "anon";

revoke delete on table "public"."files" from "authenticated";

revoke insert on table "public"."files" from "authenticated";

revoke references on table "public"."files" from "authenticated";

revoke select on table "public"."files" from "authenticated";

revoke trigger on table "public"."files" from "authenticated";

revoke truncate on table "public"."files" from "authenticated";

revoke update on table "public"."files" from "authenticated";

revoke delete on table "public"."files" from "service_role";

revoke insert on table "public"."files" from "service_role";

revoke references on table "public"."files" from "service_role";

revoke select on table "public"."files" from "service_role";

revoke trigger on table "public"."files" from "service_role";

revoke truncate on table "public"."files" from "service_role";

revoke update on table "public"."files" from "service_role";

revoke delete on table "public"."folders" from "anon";

revoke insert on table "public"."folders" from "anon";

revoke references on table "public"."folders" from "anon";

revoke select on table "public"."folders" from "anon";

revoke trigger on table "public"."folders" from "anon";

revoke truncate on table "public"."folders" from "anon";

revoke update on table "public"."folders" from "anon";

revoke delete on table "public"."folders" from "authenticated";

revoke insert on table "public"."folders" from "authenticated";

revoke references on table "public"."folders" from "authenticated";

revoke select on table "public"."folders" from "authenticated";

revoke trigger on table "public"."folders" from "authenticated";

revoke truncate on table "public"."folders" from "authenticated";

revoke update on table "public"."folders" from "authenticated";

revoke delete on table "public"."folders" from "service_role";

revoke insert on table "public"."folders" from "service_role";

revoke references on table "public"."folders" from "service_role";

revoke select on table "public"."folders" from "service_role";

revoke trigger on table "public"."folders" from "service_role";

revoke truncate on table "public"."folders" from "service_role";

revoke update on table "public"."folders" from "service_role";

revoke delete on table "public"."message_file_items" from "anon";

revoke insert on table "public"."message_file_items" from "anon";

revoke references on table "public"."message_file_items" from "anon";

revoke select on table "public"."message_file_items" from "anon";

revoke trigger on table "public"."message_file_items" from "anon";

revoke truncate on table "public"."message_file_items" from "anon";

revoke update on table "public"."message_file_items" from "anon";

revoke delete on table "public"."message_file_items" from "authenticated";

revoke insert on table "public"."message_file_items" from "authenticated";

revoke references on table "public"."message_file_items" from "authenticated";

revoke select on table "public"."message_file_items" from "authenticated";

revoke trigger on table "public"."message_file_items" from "authenticated";

revoke truncate on table "public"."message_file_items" from "authenticated";

revoke update on table "public"."message_file_items" from "authenticated";

revoke delete on table "public"."message_file_items" from "service_role";

revoke insert on table "public"."message_file_items" from "service_role";

revoke references on table "public"."message_file_items" from "service_role";

revoke select on table "public"."message_file_items" from "service_role";

revoke trigger on table "public"."message_file_items" from "service_role";

revoke truncate on table "public"."message_file_items" from "service_role";

revoke update on table "public"."message_file_items" from "service_role";

revoke delete on table "public"."messages" from "anon";

revoke insert on table "public"."messages" from "anon";

revoke references on table "public"."messages" from "anon";

revoke select on table "public"."messages" from "anon";

revoke trigger on table "public"."messages" from "anon";

revoke truncate on table "public"."messages" from "anon";

revoke update on table "public"."messages" from "anon";

revoke delete on table "public"."messages" from "authenticated";

revoke insert on table "public"."messages" from "authenticated";

revoke references on table "public"."messages" from "authenticated";

revoke select on table "public"."messages" from "authenticated";

revoke trigger on table "public"."messages" from "authenticated";

revoke truncate on table "public"."messages" from "authenticated";

revoke update on table "public"."messages" from "authenticated";

revoke delete on table "public"."messages" from "service_role";

revoke insert on table "public"."messages" from "service_role";

revoke references on table "public"."messages" from "service_role";

revoke select on table "public"."messages" from "service_role";

revoke trigger on table "public"."messages" from "service_role";

revoke truncate on table "public"."messages" from "service_role";

revoke update on table "public"."messages" from "service_role";

revoke delete on table "public"."model_workspaces" from "anon";

revoke insert on table "public"."model_workspaces" from "anon";

revoke references on table "public"."model_workspaces" from "anon";

revoke select on table "public"."model_workspaces" from "anon";

revoke trigger on table "public"."model_workspaces" from "anon";

revoke truncate on table "public"."model_workspaces" from "anon";

revoke update on table "public"."model_workspaces" from "anon";

revoke delete on table "public"."model_workspaces" from "authenticated";

revoke insert on table "public"."model_workspaces" from "authenticated";

revoke references on table "public"."model_workspaces" from "authenticated";

revoke select on table "public"."model_workspaces" from "authenticated";

revoke trigger on table "public"."model_workspaces" from "authenticated";

revoke truncate on table "public"."model_workspaces" from "authenticated";

revoke update on table "public"."model_workspaces" from "authenticated";

revoke delete on table "public"."model_workspaces" from "service_role";

revoke insert on table "public"."model_workspaces" from "service_role";

revoke references on table "public"."model_workspaces" from "service_role";

revoke select on table "public"."model_workspaces" from "service_role";

revoke trigger on table "public"."model_workspaces" from "service_role";

revoke truncate on table "public"."model_workspaces" from "service_role";

revoke update on table "public"."model_workspaces" from "service_role";

revoke delete on table "public"."models" from "anon";

revoke insert on table "public"."models" from "anon";

revoke references on table "public"."models" from "anon";

revoke select on table "public"."models" from "anon";

revoke trigger on table "public"."models" from "anon";

revoke truncate on table "public"."models" from "anon";

revoke update on table "public"."models" from "anon";

revoke delete on table "public"."models" from "authenticated";

revoke insert on table "public"."models" from "authenticated";

revoke references on table "public"."models" from "authenticated";

revoke select on table "public"."models" from "authenticated";

revoke trigger on table "public"."models" from "authenticated";

revoke truncate on table "public"."models" from "authenticated";

revoke update on table "public"."models" from "authenticated";

revoke delete on table "public"."models" from "service_role";

revoke insert on table "public"."models" from "service_role";

revoke references on table "public"."models" from "service_role";

revoke select on table "public"."models" from "service_role";

revoke trigger on table "public"."models" from "service_role";

revoke truncate on table "public"."models" from "service_role";

revoke update on table "public"."models" from "service_role";

revoke delete on table "public"."preset_workspaces" from "anon";

revoke insert on table "public"."preset_workspaces" from "anon";

revoke references on table "public"."preset_workspaces" from "anon";

revoke select on table "public"."preset_workspaces" from "anon";

revoke trigger on table "public"."preset_workspaces" from "anon";

revoke truncate on table "public"."preset_workspaces" from "anon";

revoke update on table "public"."preset_workspaces" from "anon";

revoke delete on table "public"."preset_workspaces" from "authenticated";

revoke insert on table "public"."preset_workspaces" from "authenticated";

revoke references on table "public"."preset_workspaces" from "authenticated";

revoke select on table "public"."preset_workspaces" from "authenticated";

revoke trigger on table "public"."preset_workspaces" from "authenticated";

revoke truncate on table "public"."preset_workspaces" from "authenticated";

revoke update on table "public"."preset_workspaces" from "authenticated";

revoke delete on table "public"."preset_workspaces" from "service_role";

revoke insert on table "public"."preset_workspaces" from "service_role";

revoke references on table "public"."preset_workspaces" from "service_role";

revoke select on table "public"."preset_workspaces" from "service_role";

revoke trigger on table "public"."preset_workspaces" from "service_role";

revoke truncate on table "public"."preset_workspaces" from "service_role";

revoke update on table "public"."preset_workspaces" from "service_role";

revoke delete on table "public"."presets" from "anon";

revoke insert on table "public"."presets" from "anon";

revoke references on table "public"."presets" from "anon";

revoke select on table "public"."presets" from "anon";

revoke trigger on table "public"."presets" from "anon";

revoke truncate on table "public"."presets" from "anon";

revoke update on table "public"."presets" from "anon";

revoke delete on table "public"."presets" from "authenticated";

revoke insert on table "public"."presets" from "authenticated";

revoke references on table "public"."presets" from "authenticated";

revoke select on table "public"."presets" from "authenticated";

revoke trigger on table "public"."presets" from "authenticated";

revoke truncate on table "public"."presets" from "authenticated";

revoke update on table "public"."presets" from "authenticated";

revoke delete on table "public"."presets" from "service_role";

revoke insert on table "public"."presets" from "service_role";

revoke references on table "public"."presets" from "service_role";

revoke select on table "public"."presets" from "service_role";

revoke trigger on table "public"."presets" from "service_role";

revoke truncate on table "public"."presets" from "service_role";

revoke update on table "public"."presets" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

revoke delete on table "public"."prompt_workspaces" from "anon";

revoke insert on table "public"."prompt_workspaces" from "anon";

revoke references on table "public"."prompt_workspaces" from "anon";

revoke select on table "public"."prompt_workspaces" from "anon";

revoke trigger on table "public"."prompt_workspaces" from "anon";

revoke truncate on table "public"."prompt_workspaces" from "anon";

revoke update on table "public"."prompt_workspaces" from "anon";

revoke delete on table "public"."prompt_workspaces" from "authenticated";

revoke insert on table "public"."prompt_workspaces" from "authenticated";

revoke references on table "public"."prompt_workspaces" from "authenticated";

revoke select on table "public"."prompt_workspaces" from "authenticated";

revoke trigger on table "public"."prompt_workspaces" from "authenticated";

revoke truncate on table "public"."prompt_workspaces" from "authenticated";

revoke update on table "public"."prompt_workspaces" from "authenticated";

revoke delete on table "public"."prompt_workspaces" from "service_role";

revoke insert on table "public"."prompt_workspaces" from "service_role";

revoke references on table "public"."prompt_workspaces" from "service_role";

revoke select on table "public"."prompt_workspaces" from "service_role";

revoke trigger on table "public"."prompt_workspaces" from "service_role";

revoke truncate on table "public"."prompt_workspaces" from "service_role";

revoke update on table "public"."prompt_workspaces" from "service_role";

revoke delete on table "public"."prompts" from "anon";

revoke insert on table "public"."prompts" from "anon";

revoke references on table "public"."prompts" from "anon";

revoke select on table "public"."prompts" from "anon";

revoke trigger on table "public"."prompts" from "anon";

revoke truncate on table "public"."prompts" from "anon";

revoke update on table "public"."prompts" from "anon";

revoke delete on table "public"."prompts" from "authenticated";

revoke insert on table "public"."prompts" from "authenticated";

revoke references on table "public"."prompts" from "authenticated";

revoke select on table "public"."prompts" from "authenticated";

revoke trigger on table "public"."prompts" from "authenticated";

revoke truncate on table "public"."prompts" from "authenticated";

revoke update on table "public"."prompts" from "authenticated";

revoke delete on table "public"."prompts" from "service_role";

revoke insert on table "public"."prompts" from "service_role";

revoke references on table "public"."prompts" from "service_role";

revoke select on table "public"."prompts" from "service_role";

revoke trigger on table "public"."prompts" from "service_role";

revoke truncate on table "public"."prompts" from "service_role";

revoke update on table "public"."prompts" from "service_role";

revoke delete on table "public"."tool_workspaces" from "anon";

revoke insert on table "public"."tool_workspaces" from "anon";

revoke references on table "public"."tool_workspaces" from "anon";

revoke select on table "public"."tool_workspaces" from "anon";

revoke trigger on table "public"."tool_workspaces" from "anon";

revoke truncate on table "public"."tool_workspaces" from "anon";

revoke update on table "public"."tool_workspaces" from "anon";

revoke delete on table "public"."tool_workspaces" from "authenticated";

revoke insert on table "public"."tool_workspaces" from "authenticated";

revoke references on table "public"."tool_workspaces" from "authenticated";

revoke select on table "public"."tool_workspaces" from "authenticated";

revoke trigger on table "public"."tool_workspaces" from "authenticated";

revoke truncate on table "public"."tool_workspaces" from "authenticated";

revoke update on table "public"."tool_workspaces" from "authenticated";

revoke delete on table "public"."tool_workspaces" from "service_role";

revoke insert on table "public"."tool_workspaces" from "service_role";

revoke references on table "public"."tool_workspaces" from "service_role";

revoke select on table "public"."tool_workspaces" from "service_role";

revoke trigger on table "public"."tool_workspaces" from "service_role";

revoke truncate on table "public"."tool_workspaces" from "service_role";

revoke update on table "public"."tool_workspaces" from "service_role";

revoke delete on table "public"."tools" from "anon";

revoke insert on table "public"."tools" from "anon";

revoke references on table "public"."tools" from "anon";

revoke select on table "public"."tools" from "anon";

revoke trigger on table "public"."tools" from "anon";

revoke truncate on table "public"."tools" from "anon";

revoke update on table "public"."tools" from "anon";

revoke delete on table "public"."tools" from "authenticated";

revoke insert on table "public"."tools" from "authenticated";

revoke references on table "public"."tools" from "authenticated";

revoke select on table "public"."tools" from "authenticated";

revoke trigger on table "public"."tools" from "authenticated";

revoke truncate on table "public"."tools" from "authenticated";

revoke update on table "public"."tools" from "authenticated";

revoke delete on table "public"."tools" from "service_role";

revoke insert on table "public"."tools" from "service_role";

revoke references on table "public"."tools" from "service_role";

revoke select on table "public"."tools" from "service_role";

revoke trigger on table "public"."tools" from "service_role";

revoke truncate on table "public"."tools" from "service_role";

revoke update on table "public"."tools" from "service_role";

revoke delete on table "public"."workspaces" from "anon";

revoke insert on table "public"."workspaces" from "anon";

revoke references on table "public"."workspaces" from "anon";

revoke select on table "public"."workspaces" from "anon";

revoke trigger on table "public"."workspaces" from "anon";

revoke truncate on table "public"."workspaces" from "anon";

revoke update on table "public"."workspaces" from "anon";

revoke delete on table "public"."workspaces" from "authenticated";

revoke insert on table "public"."workspaces" from "authenticated";

revoke references on table "public"."workspaces" from "authenticated";

revoke select on table "public"."workspaces" from "authenticated";

revoke trigger on table "public"."workspaces" from "authenticated";

revoke truncate on table "public"."workspaces" from "authenticated";

revoke update on table "public"."workspaces" from "authenticated";

revoke delete on table "public"."workspaces" from "service_role";

revoke insert on table "public"."workspaces" from "service_role";

revoke references on table "public"."workspaces" from "service_role";

revoke select on table "public"."workspaces" from "service_role";

revoke trigger on table "public"."workspaces" from "service_role";

revoke truncate on table "public"."workspaces" from "service_role";

revoke update on table "public"."workspaces" from "service_role";

alter table "public"."assistant_collections" drop constraint "assistant_collections_assistant_id_fkey";

alter table "public"."assistant_collections" drop constraint "assistant_collections_collection_id_fkey";

alter table "public"."assistant_collections" drop constraint "assistant_collections_user_id_fkey";

alter table "public"."assistant_files" drop constraint "assistant_files_assistant_id_fkey";

alter table "public"."assistant_files" drop constraint "assistant_files_file_id_fkey";

alter table "public"."assistant_files" drop constraint "assistant_files_user_id_fkey";

alter table "public"."assistant_tools" drop constraint "assistant_tools_assistant_id_fkey";

alter table "public"."assistant_tools" drop constraint "assistant_tools_tool_id_fkey";

alter table "public"."assistant_tools" drop constraint "assistant_tools_user_id_fkey";

alter table "public"."assistant_workspaces" drop constraint "assistant_workspaces_assistant_id_fkey";

alter table "public"."assistant_workspaces" drop constraint "assistant_workspaces_user_id_fkey";

alter table "public"."assistant_workspaces" drop constraint "assistant_workspaces_workspace_id_fkey";

alter table "public"."assistants" drop constraint "assistants_description_check";

alter table "public"."assistants" drop constraint "assistants_embeddings_provider_check";

alter table "public"."assistants" drop constraint "assistants_folder_id_fkey";

alter table "public"."assistants" drop constraint "assistants_image_path_check";

alter table "public"."assistants" drop constraint "assistants_model_check";

alter table "public"."assistants" drop constraint "assistants_name_check";

alter table "public"."assistants" drop constraint "assistants_prompt_check";

alter table "public"."assistants" drop constraint "assistants_user_id_fkey";

alter table "public"."chat_files" drop constraint "chat_files_chat_id_fkey";

alter table "public"."chat_files" drop constraint "chat_files_file_id_fkey";

alter table "public"."chat_files" drop constraint "chat_files_user_id_fkey";

alter table "public"."chats" drop constraint "chats_assistant_id_fkey";

alter table "public"."chats" drop constraint "chats_embeddings_provider_check";

alter table "public"."chats" drop constraint "chats_folder_id_fkey";

alter table "public"."chats" drop constraint "chats_model_check";

alter table "public"."chats" drop constraint "chats_name_check";

alter table "public"."chats" drop constraint "chats_prompt_check";

alter table "public"."chats" drop constraint "chats_user_id_fkey";

alter table "public"."chats" drop constraint "chats_workspace_id_fkey";

alter table "public"."collection_files" drop constraint "collection_files_collection_id_fkey";

alter table "public"."collection_files" drop constraint "collection_files_file_id_fkey";

alter table "public"."collection_files" drop constraint "collection_files_user_id_fkey";

alter table "public"."collection_workspaces" drop constraint "collection_workspaces_collection_id_fkey";

alter table "public"."collection_workspaces" drop constraint "collection_workspaces_user_id_fkey";

alter table "public"."collection_workspaces" drop constraint "collection_workspaces_workspace_id_fkey";

alter table "public"."collections" drop constraint "collections_description_check";

alter table "public"."collections" drop constraint "collections_folder_id_fkey";

alter table "public"."collections" drop constraint "collections_name_check";

alter table "public"."collections" drop constraint "collections_user_id_fkey";

alter table "public"."file_items" drop constraint "file_items_file_id_fkey";

alter table "public"."file_items" drop constraint "file_items_user_id_fkey";

alter table "public"."file_workspaces" drop constraint "file_workspaces_file_id_fkey";

alter table "public"."file_workspaces" drop constraint "file_workspaces_user_id_fkey";

alter table "public"."file_workspaces" drop constraint "file_workspaces_workspace_id_fkey";

alter table "public"."files" drop constraint "files_description_check";

alter table "public"."files" drop constraint "files_file_path_check";

alter table "public"."files" drop constraint "files_folder_id_fkey";

alter table "public"."files" drop constraint "files_name_check";

alter table "public"."files" drop constraint "files_type_check";

alter table "public"."files" drop constraint "files_user_id_fkey";

alter table "public"."folders" drop constraint "folders_user_id_fkey";

alter table "public"."folders" drop constraint "folders_workspace_id_fkey";

alter table "public"."message_file_items" drop constraint "message_file_items_file_item_id_fkey";

alter table "public"."message_file_items" drop constraint "message_file_items_message_id_fkey";

alter table "public"."message_file_items" drop constraint "message_file_items_user_id_fkey";

alter table "public"."messages" drop constraint "check_image_paths_length";

alter table "public"."messages" drop constraint "messages_assistant_id_fkey";

alter table "public"."messages" drop constraint "messages_chat_id_fkey";

alter table "public"."messages" drop constraint "messages_content_check";

alter table "public"."messages" drop constraint "messages_model_check";

alter table "public"."messages" drop constraint "messages_role_check";

alter table "public"."messages" drop constraint "messages_user_id_fkey";

alter table "public"."model_workspaces" drop constraint "model_workspaces_model_id_fkey";

alter table "public"."model_workspaces" drop constraint "model_workspaces_user_id_fkey";

alter table "public"."model_workspaces" drop constraint "model_workspaces_workspace_id_fkey";

alter table "public"."models" drop constraint "models_api_key_check";

alter table "public"."models" drop constraint "models_base_url_check";

alter table "public"."models" drop constraint "models_description_check";

alter table "public"."models" drop constraint "models_folder_id_fkey";

alter table "public"."models" drop constraint "models_model_id_check";

alter table "public"."models" drop constraint "models_name_check";

alter table "public"."models" drop constraint "models_user_id_fkey";

alter table "public"."preset_workspaces" drop constraint "preset_workspaces_preset_id_fkey";

alter table "public"."preset_workspaces" drop constraint "preset_workspaces_user_id_fkey";

alter table "public"."preset_workspaces" drop constraint "preset_workspaces_workspace_id_fkey";

alter table "public"."presets" drop constraint "presets_description_check";

alter table "public"."presets" drop constraint "presets_embeddings_provider_check";

alter table "public"."presets" drop constraint "presets_folder_id_fkey";

alter table "public"."presets" drop constraint "presets_model_check";

alter table "public"."presets" drop constraint "presets_name_check";

alter table "public"."presets" drop constraint "presets_prompt_check";

alter table "public"."presets" drop constraint "presets_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_anthropic_api_key_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_35_turbo_id_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_45_turbo_id_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_45_vision_id_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_api_key_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_embeddings_id_check";

alter table "public"."profiles" drop constraint "profiles_azure_openai_endpoint_check";

alter table "public"."profiles" drop constraint "profiles_bio_check";

alter table "public"."profiles" drop constraint "profiles_display_name_check";

alter table "public"."profiles" drop constraint "profiles_google_gemini_api_key_check";

alter table "public"."profiles" drop constraint "profiles_groq_api_key_check";

alter table "public"."profiles" drop constraint "profiles_image_path_check";

alter table "public"."profiles" drop constraint "profiles_image_url_check";

alter table "public"."profiles" drop constraint "profiles_mistral_api_key_check";

alter table "public"."profiles" drop constraint "profiles_openai_api_key_check";

alter table "public"."profiles" drop constraint "profiles_openai_organization_id_check";

alter table "public"."profiles" drop constraint "profiles_openrouter_api_key_check";

alter table "public"."profiles" drop constraint "profiles_perplexity_api_key_check";

alter table "public"."profiles" drop constraint "profiles_profile_context_check";

alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_user_id_key";

alter table "public"."profiles" drop constraint "profiles_username_check";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."prompt_workspaces" drop constraint "prompt_workspaces_prompt_id_fkey";

alter table "public"."prompt_workspaces" drop constraint "prompt_workspaces_user_id_fkey";

alter table "public"."prompt_workspaces" drop constraint "prompt_workspaces_workspace_id_fkey";

alter table "public"."prompts" drop constraint "prompts_content_check";

alter table "public"."prompts" drop constraint "prompts_folder_id_fkey";

alter table "public"."prompts" drop constraint "prompts_name_check";

alter table "public"."prompts" drop constraint "prompts_user_id_fkey";

alter table "public"."tool_workspaces" drop constraint "tool_workspaces_tool_id_fkey";

alter table "public"."tool_workspaces" drop constraint "tool_workspaces_user_id_fkey";

alter table "public"."tool_workspaces" drop constraint "tool_workspaces_workspace_id_fkey";

alter table "public"."tools" drop constraint "tools_description_check";

alter table "public"."tools" drop constraint "tools_folder_id_fkey";

alter table "public"."tools" drop constraint "tools_name_check";

alter table "public"."tools" drop constraint "tools_url_check";

alter table "public"."tools" drop constraint "tools_user_id_fkey";

alter table "public"."workspaces" drop constraint "workspaces_default_model_check";

alter table "public"."workspaces" drop constraint "workspaces_default_prompt_check";

alter table "public"."workspaces" drop constraint "workspaces_description_check";

alter table "public"."workspaces" drop constraint "workspaces_embeddings_provider_check";

alter table "public"."workspaces" drop constraint "workspaces_image_path_check";

alter table "public"."workspaces" drop constraint "workspaces_instructions_check";

alter table "public"."workspaces" drop constraint "workspaces_name_check";

alter table "public"."workspaces" drop constraint "workspaces_user_id_fkey";

alter table "public"."assistant_collections" drop constraint "assistant_collections_pkey";

alter table "public"."assistant_files" drop constraint "assistant_files_pkey";

alter table "public"."assistant_tools" drop constraint "assistant_tools_pkey";

alter table "public"."assistant_workspaces" drop constraint "assistant_workspaces_pkey";

alter table "public"."assistants" drop constraint "assistants_pkey";

alter table "public"."chat_files" drop constraint "chat_files_pkey";

alter table "public"."chats" drop constraint "chats_pkey";

alter table "public"."collection_files" drop constraint "collection_files_pkey";

alter table "public"."collection_workspaces" drop constraint "collection_workspaces_pkey";

alter table "public"."collections" drop constraint "collections_pkey";

alter table "public"."file_items" drop constraint "file_items_pkey";

alter table "public"."file_workspaces" drop constraint "file_workspaces_pkey";

alter table "public"."files" drop constraint "files_pkey";

alter table "public"."folders" drop constraint "folders_pkey";

alter table "public"."message_file_items" drop constraint "message_file_items_pkey";

alter table "public"."messages" drop constraint "messages_pkey";

alter table "public"."model_workspaces" drop constraint "model_workspaces_pkey";

alter table "public"."models" drop constraint "models_pkey";

alter table "public"."preset_workspaces" drop constraint "preset_workspaces_pkey";

alter table "public"."presets" drop constraint "presets_pkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

alter table "public"."prompt_workspaces" drop constraint "prompt_workspaces_pkey";

alter table "public"."prompts" drop constraint "prompts_pkey";

alter table "public"."tool_workspaces" drop constraint "tool_workspaces_pkey";

alter table "public"."tools" drop constraint "tools_pkey";

alter table "public"."workspaces" drop constraint "workspaces_pkey";

drop index if exists "public"."assistant_collections_assistant_id_idx";

drop index if exists "public"."assistant_collections_collection_id_idx";

drop index if exists "public"."assistant_collections_pkey";

drop index if exists "public"."assistant_collections_user_id_idx";

drop index if exists "public"."assistant_files_assistant_id_idx";

drop index if exists "public"."assistant_files_file_id_idx";

drop index if exists "public"."assistant_files_pkey";

drop index if exists "public"."assistant_files_user_id_idx";

drop index if exists "public"."assistant_tools_assistant_id_idx";

drop index if exists "public"."assistant_tools_pkey";

drop index if exists "public"."assistant_tools_tool_id_idx";

drop index if exists "public"."assistant_tools_user_id_idx";

drop index if exists "public"."assistant_workspaces_assistant_id_idx";

drop index if exists "public"."assistant_workspaces_pkey";

drop index if exists "public"."assistant_workspaces_user_id_idx";

drop index if exists "public"."assistant_workspaces_workspace_id_idx";

drop index if exists "public"."assistants_pkey";

drop index if exists "public"."assistants_user_id_idx";

drop index if exists "public"."chat_files_pkey";

drop index if exists "public"."chats_pkey";

drop index if exists "public"."collection_files_pkey";

drop index if exists "public"."collection_workspaces_collection_id_idx";

drop index if exists "public"."collection_workspaces_pkey";

drop index if exists "public"."collection_workspaces_user_id_idx";

drop index if exists "public"."collection_workspaces_workspace_id_idx";

drop index if exists "public"."collections_pkey";

drop index if exists "public"."collections_user_id_idx";

drop index if exists "public"."file_items_embedding_idx";

drop index if exists "public"."file_items_file_id_idx";

drop index if exists "public"."file_items_local_embedding_idx";

drop index if exists "public"."file_items_pkey";

drop index if exists "public"."file_workspaces_file_id_idx";

drop index if exists "public"."file_workspaces_pkey";

drop index if exists "public"."file_workspaces_user_id_idx";

drop index if exists "public"."file_workspaces_workspace_id_idx";

drop index if exists "public"."files_pkey";

drop index if exists "public"."files_user_id_idx";

drop index if exists "public"."folders_pkey";

drop index if exists "public"."folders_user_id_idx";

drop index if exists "public"."folders_workspace_id_idx";

drop index if exists "public"."idx_chat_files_chat_id";

drop index if exists "public"."idx_chats_user_id";

drop index if exists "public"."idx_chats_workspace_id";

drop index if exists "public"."idx_collection_files_collection_id";

drop index if exists "public"."idx_collection_files_file_id";

drop index if exists "public"."idx_message_file_items_message_id";

drop index if exists "public"."idx_messages_chat_id";

drop index if exists "public"."idx_profiles_user_id";

drop index if exists "public"."idx_unique_home_workspace_per_user";

drop index if exists "public"."idx_workspaces_user_id";

drop index if exists "public"."message_file_items_pkey";

drop index if exists "public"."messages_pkey";

drop index if exists "public"."model_workspaces_model_id_idx";

drop index if exists "public"."model_workspaces_pkey";

drop index if exists "public"."model_workspaces_user_id_idx";

drop index if exists "public"."model_workspaces_workspace_id_idx";

drop index if exists "public"."models_pkey";

drop index if exists "public"."models_user_id_idx";

drop index if exists "public"."preset_workspaces_pkey";

drop index if exists "public"."preset_workspaces_preset_id_idx";

drop index if exists "public"."preset_workspaces_user_id_idx";

drop index if exists "public"."preset_workspaces_workspace_id_idx";

drop index if exists "public"."presets_pkey";

drop index if exists "public"."presets_user_id_idx";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_user_id_key";

drop index if exists "public"."profiles_username_key";

drop index if exists "public"."prompt_workspaces_pkey";

drop index if exists "public"."prompt_workspaces_prompt_id_idx";

drop index if exists "public"."prompt_workspaces_user_id_idx";

drop index if exists "public"."prompt_workspaces_workspace_id_idx";

drop index if exists "public"."prompts_pkey";

drop index if exists "public"."prompts_user_id_idx";

drop index if exists "public"."tool_workspaces_pkey";

drop index if exists "public"."tool_workspaces_tool_id_idx";

drop index if exists "public"."tool_workspaces_user_id_idx";

drop index if exists "public"."tool_workspaces_workspace_id_idx";

drop index if exists "public"."tools_pkey";

drop index if exists "public"."tools_user_id_idx";

drop index if exists "public"."workspaces_pkey";

drop table "public"."assistant_collections";

drop table "public"."assistant_files";

drop table "public"."assistant_tools";

drop table "public"."assistant_workspaces";

drop table "public"."assistants";

drop table "public"."chat_files";

drop table "public"."chats";

drop table "public"."collection_files";

drop table "public"."collection_workspaces";

drop table "public"."collections";

drop table "public"."file_items";

drop table "public"."file_workspaces";

drop table "public"."files";

drop table "public"."folders";

drop table "public"."message_file_items";

drop table "public"."messages";

drop table "public"."model_workspaces";

drop table "public"."models";

drop table "public"."preset_workspaces";

drop table "public"."presets";

drop table "public"."profiles";

drop table "public"."prompt_workspaces";

drop table "public"."prompts";

drop table "public"."tool_workspaces";

drop table "public"."tools";

drop table "public"."workspaces";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.ensure_profiles_table()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      -- Adicione aqui os outros campos necessários para a tabela profiles
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ
    );

    CREATE UNIQUE INDEX idx_profiles_user_id ON public.profiles (user_id);

    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view their own profile"
      ON public.profiles
      FOR SELECT
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own profile"
      ON public.profiles
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own profile"
      ON public.profiles
      FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.ensure_user_tokens_table()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_tokens') THEN
    CREATE TABLE public.user_tokens (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      tokens_remaining INTEGER NOT NULL DEFAULT 0,
      tokens_used INTEGER NOT NULL DEFAULT 0,
      last_reset_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      is_pro BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ
    );

    CREATE INDEX idx_user_tokens_user_id ON public.user_tokens (user_id);

    ALTER TABLE public.user_tokens ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Users can view their own tokens"
      ON public.user_tokens
      FOR SELECT
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own tokens"
      ON public.user_tokens
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own tokens"
      ON public.user_tokens
      FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_profile_and_workspace()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    random_username TEXT;
BEGIN
    -- Generate a random username
    random_username := 'user' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 16);

    -- Create a profile for the new user
    INSERT INTO public.profiles(user_id, anthropic_api_key, azure_openai_35_turbo_id, azure_openai_45_turbo_id, azure_openai_45_vision_id, azure_openai_api_key, azure_openai_endpoint, google_gemini_api_key, has_onboarded, image_url, image_path, mistral_api_key, display_name, bio, openai_api_key, openai_organization_id, perplexity_api_key, profile_context, use_azure_openai, username)
    VALUES(
        NEW.id,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        FALSE,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        FALSE,
        random_username
    );

    INSERT INTO public.workspaces(user_id, is_home, name, default_context_length, default_model, default_prompt, default_temperature, description, embeddings_provider, include_profile_context, include_workspace_instructions, instructions)
    VALUES(
        NEW.id,
        TRUE,
        'Home',
        4096,
        'gpt-4-turbo-preview', -- Updated default model
        'Você é um assistente de IA amigável e prestativo..',
        0.5,
        'My home workspace.',
        'openai',
        TRUE,
        TRUE,
        ''
    );

    RETURN NEW;
END;
$function$
;


